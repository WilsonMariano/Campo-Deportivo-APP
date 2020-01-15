import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService, FxGlobalsService, DiccionarioService, CuotaService, PdfGeneratorService } from 'src/app/services/services.index';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Cuota } from 'src/app/class/class.index';
declare var moment: any;

@Component({
  selector: 'app-nuevo-pago',
  templateUrl: './nuevo-pago.component.html',
  styleUrls: ['nuevo-pago.component.css']
})
export class NuevoPagoComponent implements OnInit {

  public forma: FormGroup;
  public socioTitular = null;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _socio: SocioService, 
    private _fx: FxGlobalsService, 
    private _cuota: CuotaService,
    private _diccionario: DiccionarioService,
    private _pdf: PdfGeneratorService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.forma = this.fb.group({
      'cbForm': new FormControl(''),
      'fechaPago': new FormControl('', Validators.required),
      'fechaVencimiento': new FormControl('', Validators.required),
      'monto': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required)
    });

    this.disableForm();
    this.getDateNow();
    this.getValorCuota();

    this.getParams();
  }

  /**
   * Recibo los parametros de la url
   * Si se recibe un id de socio se invoca el metodo para recuperar el socio
   */
  private getParams(): void {

    this.activatedRoute.params.subscribe(
      params => {
        if(params.id != 'nuevo')
          this.getTitular(params.id);
      }
    );
  }

  private getTitular(idSocio): void {
 
    this._socio.getTitular(idSocio).subscribe(
      data => this.socioTitular = data.data,
      err =>  this._fx.showAlert("Error", "El socio buscado no existe", "error")
    );
  }

  public disableForm(): void {

    this.forma.get('cbForm').setValue('default');
    this.forma.get('fechaPago').disable();
    this.forma.get('fechaVencimiento').disable();
    this.forma.get('monto').disable();
  }

  public enableForm(): void {

    this.forma.get('cbForm').setValue('manual');
    this.forma.get('fechaPago').enable();
    this.forma.get('fechaVencimiento').enable();
    this.forma.get('monto').enable();
  }

  private getDateNow(): void {

    let fecha = moment().format('YYYY-MM-DD');
    this.forma.get('fechaPago').setValue(fecha);

    fecha = moment().add(1, 'months').format('YYYY-MM-DD');
    this.forma.get('fechaVencimiento').setValue(fecha);
  }

  private getValorCuota(): void {

    this._diccionario.getWithKeys('cod_valor_cuota').subscribe(
      data => this.forma.get('monto').setValue(data.data[0].valor)
    );
  }

  public onSubmit(): void {

    this._fx.showQuestionAlert("Confirmación", "¿Los datos son correctos?", "warning").then(
      () => {

        let cuota = new Cuota();
        cuota.setIdSocioTitular(this.socioTitular.idSocioTitular);
        cuota.setFechaPago(this.forma.get('fechaPago').value);
        cuota.setFechaVencimiento(this.forma.get('fechaVencimiento').value);
        cuota.setMonto(this.forma.get('monto').value);
        cuota.setDescripcion(this.forma.get('descripcion').value);
    
        this._cuota.insertCuota(cuota).subscribe(
          data => {
            this._pdf.generarRecibo(data.data);
            this.router.navigate(['home/pagos/', this.socioTitular.idSocioTitular]);
          }
        );
      }
    )

   
    
  }

}
