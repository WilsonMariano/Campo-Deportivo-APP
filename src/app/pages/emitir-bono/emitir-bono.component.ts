import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService, DiccionarioService, FxGlobalsService, ValoresService, PdfGeneratorService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bono } from 'src/app/class/class.index';
import { BonoService } from 'src/app/services/http/bono.service';
declare var moment: any;

@Component({
  selector: 'app-emitir-bono',
  templateUrl: './emitir-bono.component.html',
  styleUrls: ['emitir-bono.component.css']
})
export class EmitirBonoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _socio: SocioService, 
    private _diccionario: DiccionarioService, 
    private _fxGlobals: FxGlobalsService,
    private _pdf: PdfGeneratorService,
    private _bono: BonoService,
    private _valores: ValoresService,
    private router: Router) { }

  public forma: FormGroup;
  public arrPrestaciones = [];
  public arrParentesco = [];
  public arrDias = [];
  public socio = null;
  public bonoPrevia = null;

  ngOnInit() {

    this.forma = new FormGroup({

      'cbForm': new FormControl('default'),
      'idSocio': new FormControl({value: '', disabled: true}),
      'apellido': new FormControl({value: '', disabled: true}),
      'nombre': new FormControl({value: '', disabled: true}),
      'codParentesco': new FormControl({value: '', disabled: true}),
      'fechaAsignacion': new FormControl('', Validators.required),
      'horaAsignacion': new FormControl(''),
      'codPrestacion': new FormControl('', Validators.required),
      'monto': new FormControl('', Validators.required),
      'codDia': new FormControl(''),
      'descripcion': new FormControl('')

    });

    this.getParams();
    this.getDiccionario();
    this.onChangeCB();
    this.initializeDate();
    this.calculateTarifa();
  }

  /**
   * Recibo los parametros de la url
   * Si se recibe un id de socio se invoca el metodo para recuperar el socio
   */
  private getParams(): void {

    this.activatedRoute.params.subscribe(
      params => {
        if(params.id != 'nuevo')
          this.getSocio(params.id);
      }
    );
  }


/**
 * Primer método que se ejecuta. Recupera un id como parámetro de la url y luego solicita el socio
 * Una vez recuperado el socio asigna sus atributos a la forma. Si no se encuentra el socio se muestra
 * un mensaje.
 */
  public getSocio(idSocio): void {

    this._socio.getOne(idSocio).subscribe(
      data => {

        this.socio = data.data;

        this.forma.get('idSocio').setValue(this.socio.id);
        this.forma.get('apellido').setValue(this.socio.apellido);
        this.forma.get('nombre').setValue(this.socio.nombre);
        this.forma.get('codParentesco').setValue(this.socio.codParentesco);
      },
      err => {

        this._fxGlobals.showAlert("Error", "El socio no existe", "error");
        this.router.navigate(['home/bonos']);
      }

    )
  }

  /**
   * Mediante solicitudes a la api trae y llena los array de opciones de la forma.
   */
  private getDiccionario(): void {

    this._diccionario.getWithKeys('cod_prestacion').subscribe(
      data => this.arrPrestaciones = data.data
    );

    this._diccionario.getWithKeys('cod_parentesco').subscribe(
      data => this.arrParentesco = data.data
    );

    this._diccionario.getWithKeys('cod_dia').subscribe(
      data => this.arrDias = data.data
    );
  }

  /**
   * Se ejecuta cada vez que se selecciona un radio y cuando se carga por primera vez la página.
   * Habilitando y deshabilitando los campos monto y codDia segun corresponda (carga manual y automatica).
   */
  public onChangeCB(): void {

    if(this.forma.get('cbForm').value === 'default') {

      this.forma.get('codDia').disable();
      this.forma.get('monto').disable();
    
    } else {

      this.forma.get('codDia').enable();
      this.forma.get('monto').enable();
    }
  }

  /**
   * Incializa el campo fechaAsignacion del formulario con la fecha actual.
   * Se ejecuta cuando carga la página.
   */
  private initializeDate(): void {

    let fecha = moment().format('YYYY-MM-DD');
    this.forma.get('fechaAsignacion').setValue(fecha);
  }
 

  /**
   * Según el día de la semana, en base a la fechaAsignacion, calcula la tarifa a aplicar al precio del bono.
   * Se ejecuta cada vez que se hace blur en el cambo de fechaAsignacion y al momento de carga de la vista.
   */
  public calculateTarifa(): void {

    if(this.forma.get('fechaAsignacion').valid) {

      let fecha = moment(this.forma.get('fechaAsignacion').value);
      let dia = Number.parseInt(fecha.format('d'));
      
      if(dia === 6 || dia === 7)
        this.forma.get('codDia').setValue('cod_dia_2');
      else
        this.forma.get('codDia').setValue('cod_dia_1');
    }

    this.getMonto();
  }

  /**
   * Hace un petición al servidor para traer el monto a cobrar.
   * A partir del tipo de prestación, tarifa y edad.
   * Se ejecuta cada vez que cambian los siguientes campos: 
   * codPrestacion, fechaAsignacion, tarifa.
   */
  public getMonto(): void {

    if(this.forma.get('codPrestacion').valid && this.forma.get('fechaAsignacion').valid) {
      
      this._valores.getValor(
        this.forma.get('codPrestacion').value, 
        this.forma.get('codDia').value,
        this.socio.codTipoSocio,
        this.socio.edad)
        .subscribe(
          data => this.forma.get('monto').setValue(data.data.valor),
          err => this._fxGlobals.showAlert("Error", "La tarifa no se encuentra cargada", "error" )
        )
    }

  }

  public onSubmit() {
      
    this._fxGlobals.showQuestionAlert("Confirmación", "¿Los datos son correctos?", "warning")
    .then(() => {

      // Genero el objeto
      let bono = new Bono();
      bono.setIdSocio(this.forma.get('idSocio').value);
      bono.setMonto(this.forma.get('monto').value);
      bono.setFechaAsignacion(this.forma.get('fechaAsignacion').value);
      bono.setHoraAsignacion(this.forma.get('horaAsignacion').value);
      bono.setFechaEmision(new Date("2020-01-07"));
      bono.setCodPrestacion(this.forma.get('codPrestacion').value);
      bono.setDetalle(this.forma.get('descripcion').value);

        // Inserto el bono
      this._bono.insert(bono).subscribe(

        // Asigno el bono recuperado y muestro la pantalla de vista previa
        data => this.bonoPrevia = { 'hash': this.socio.hash, "bono": data.data  }
      );
    });
  }

}
