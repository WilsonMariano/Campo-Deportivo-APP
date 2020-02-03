import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiccionarioService, SocioService, CommonService, FxGlobalsService } from 'src/app/services/services.index';
import { Socio } from 'src/app/class/class.index';

@Component({
  selector: 'app-datos-socio',
  templateUrl: './datos-socio.component.html',
  styles: []
})
export class DatosSocioComponent implements OnInit {

  // Objeti donde se guardan los parámetros recibidos
  public params = {
    'operacion':  null,
    'entidad':    null,
    'id':         null
  }

  public forma: FormGroup;
  public arrParentesco: any[];
  public arrTipoAfiliado: any[];


  constructor(
    private _diccionario: DiccionarioService, 
    private _socio: SocioService, 
    private _common: CommonService, 
    private activatedRoute: ActivatedRoute, 
    private _fx: FxGlobalsService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {

    this.forma = new FormGroup({
      'id': new FormControl(''),
      'idSocioTitular': new FormControl(''),
      'tipoAfiliado': new FormControl('', Validators.required),
      'numeroAfiliado': new FormControl(''),
      'apellido': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'dni': new FormControl('', Validators.required),
      'fechaNacimiento': new FormControl('', Validators.required),
      'telefono': new FormControl(''),
      'parentesco': new FormControl({ value: '', disabled: true }, Validators.required),
      'activo': new FormControl('1', Validators.required)
    });

    this.getDiccionario();
    this.getParams();
  }

  public getParams(): void {

    //Recibo parámetros
    this.activatedRoute.params.subscribe(

      params => {

        // Guardo los parámetros
        this.params.entidad = params.entidad;
        this.params.operacion = params.operacion;
        this.params.id = params.id;

        // Si es edición voy a buscar el socio del id recibido
        if(params.operacion == 'editar') 
          this.getSocio(params.id);
        
        // Si es alta deshabilito el campo estado
        else
          this.forma.get('activo').disable();
        

        if (params.entidad != 'titular') {

          if(params.entidad == 'familiar')
            this.forma.get('parentesco').setValue('cod_parentesco_2');
          else
            this.forma.get('parentesco').setValue('cod_parentesco_3');

          // Si la entidad es de tipo familiar desactivo los campos y asigno el parentesco
          this.forma.get('tipoAfiliado').disable();
          this.forma.get('numeroAfiliado').disable();

          // Entidad = familiar && operacion = nuevo
          if (params.operacion == 'nuevo') {

            // Traigo los datos del socio titular mediante el id recibido
            this._common.getOne('SociosTitulares', params.id).subscribe(

              data => {
                // Asigno los datos del socioTitular en el formulario
                this.forma.get('idSocioTitular').setValue(data.id);
                this.forma.get('numeroAfiliado').setValue(data.nroAfiliado);
                this.forma.get('tipoAfiliado').setValue(data.codTipoSocio);
              }
            );
          }
        
        // Si es de tipo titular asigno el parentesco
        } else {

          this.forma.get('parentesco').setValue('cod_parentesco_1');
        }
      });
  }

  public getDiccionario(): void {

    this._diccionario.getWithKeys('cod_parentesco').subscribe(
      data => this.arrParentesco = data.data
    );

    this._diccionario.getWithKeys('cod_tipo_socio').subscribe(
      data => this.arrTipoAfiliado = data.data
    );
  }

  public getSocio(id: Number): void {

    this._socio.getOne(id).subscribe(
      data => {

        let socio = data.data;

        this.forma.get('id').setValue(socio.id);
        this.forma.get('idSocioTitular').setValue(socio.idSocioTitular);
        this.forma.get('tipoAfiliado').setValue(socio.codTipoSocio);
        this.forma.get('numeroAfiliado').setValue(socio.nroAfiliado);
        this.forma.get('apellido').setValue(socio.apellido);
        this.forma.get('nombre').setValue(socio.nombre);
        this.forma.get('dni').setValue(socio.dni);
        this.forma.get('fechaNacimiento').setValue(socio.fechaNacimiento);
        this.forma.get('telefono').setValue(socio.telefono);
        this.forma.get('parentesco').setValue(socio.codParentesco);
        this.forma.get('activo').setValue(socio.activo);

        // Si el socio es familiar desactivo los campos
        if (socio.codParentesco == 'cod_parentesco_2') {

          this.forma.get('tipoAfiliado').disable();
          this.forma.get('numeroAfiliado').disable();
          this.forma.get('parentesco').disable();
        }
      }
    )
  }


  public onSubmit(): void {

    let socio = new Socio();

    socio.setCodTipoSocio(this.forma.get('tipoAfiliado').value);
    socio.setNroAfiliado(this.forma.get('numeroAfiliado').value);
    socio.setApellido(this._fx.capitalize(this.forma.get('apellido').value));
    socio.setNombre(this._fx.capitalize(this.forma.get('nombre').value));
    socio.setDni(this.forma.get('dni').value);
    socio.setFechaNacimiento(this.forma.get('fechaNacimiento').value);
    socio.setTelefono(this.forma.get('telefono').value);
    socio.setCodParentesco(this.forma.get('parentesco').value);
    socio.setActivo(this.forma.get('activo').value);


    console.log(socio);


    if (this.params.operacion == 'editar') {

      socio.setId(this.forma.get('id').value);
      socio.setIdSocioTitular(this.forma.get('idSocioTitular').value);

      this._socio.update(socio).subscribe(
        data => this.showMessage('ok')
        
      );

    } else {

      // Si es titular
      if (this.params.entidad == 'titular') {

        this._socio.insert(socio).subscribe(
          data => this.showMessage('ok')
        );

      // Si es familia
      } else {

        socio.setIdSocioTitular(this.forma.get('idSocioTitular').value);

        this._socio.insertFamilia(socio).subscribe(
          data => this.showMessage('ok')
        );
      }
    }
  }

  private showMessage(status: string): void {

    if(status === 'ok')
      this._fx.showAlert("Perfecto!", "Operación realizada con éxito", "success");
    
    else
      this._fx.showAlert("Error!", "Hubo un problema al realizar lo solicitado", "error");

    this.location.back();
  }

}
