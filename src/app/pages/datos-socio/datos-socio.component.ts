import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiccionarioService, SocioService, CommonService } from 'src/app/services/services.index';
import { Socio } from 'src/app/class/class.index';

@Component({
  selector: 'app-datos-socio',
  templateUrl: './datos-socio.component.html',
  styles: []
})
export class DatosSocioComponent implements OnInit {

  public newOperation = true;
  public forma: FormGroup;
  public arrParentesco: any[];
  public arrTipoAfiliado: any[];


  constructor(private _diccionario: DiccionarioService, private _socio: SocioService, private _common: CommonService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {

    this.forma = new FormGroup({
      'id':     new FormControl(''),
      'idSocioTitular':   new FormControl(''),
      'tipoAfiliado':     new FormControl('', Validators.required),
      'numeroAfiliado':   new FormControl('', Validators.required),
      'apellido':         new FormControl('', Validators.required),
      'nombre':           new FormControl('', Validators.required),
      'dni':              new FormControl('', Validators.required),
      'fechaNacimiento':  new FormControl('', Validators.required),
      'parentesco':       new FormControl({ value: '', disabled: true }, Validators.required),
      'estado':           new FormControl('', Validators.required)
    });


    //Recibo ID
    this.activatedRoute.params.subscribe(
      data => {

        let param = data['id'];
        let parentesco = localStorage.getItem('parentesco');

        let idSocioTitular = localStorage.getItem("idSocioTitular");
        this.forma.get('idSocioTitular').setValue(idSocioTitular);

        if(param != 'nuevo' && !Number.isInteger(Number.parseInt(param)))
          this.router.navigate(['home/grilla-socios']);


        if(parentesco == 'titular') 
          this.forma.get('parentesco').setValue('cod_parentesco_1');
        
        else 
          this.forma.get('parentesco').setValue('cod_parentesco_2');
          

        if(param == 'nuevo') {

          this.forma.get('estado').setValue(1);
          this.forma.get('estado').disable();


          if(parentesco == 'familiar') {

            this.forma.get('tipoAfiliado').disable();
            this.forma.get('numeroAfiliado').disable();
          

            this.getSocioTitular(idSocioTitular);
          }

        }
        else {

          this.newOperation = false;
          this.forma.get('id').setValue(param);
          this.getSocio(param);
        }
      });

      

     

    this.getDiccionario();
  }

  public getDiccionario(): void {

    this._diccionario.getWithKeys('cod_parentesco').subscribe(
      data => this.arrParentesco = data.data
    );

    this._diccionario.getWithKeys('cod_tipo_socio').subscribe(
      data => this.arrTipoAfiliado = data.data
    );
  }

  public getSocio(id : Number): void {

    this._socio.getOne(id).subscribe(
      data => {

        let socio = data.data;

        this.forma.get('tipoAfiliado').setValue(socio.codTipoSocio);
        this.forma.get('numeroAfiliado').setValue(socio.nroAfiliado);
        this.forma.get('apellido').setValue(socio.apellido);
        this.forma.get('nombre').setValue(socio.nombre);
        this.forma.get('dni').setValue(socio.dni);
        this.forma.get('fechaNacimiento').setValue(socio.fechaNacimiento);
        this.forma.get('parentesco').setValue(socio.codParentesco);
        this.forma.get('estado').setValue(socio.activo);

        if(socio.codParentesco == 'cod_parentesco_2') {

          this.forma.get('tipoAfiliado').disable();
          this.forma.get('numeroAfiliado').disable();
          this.forma.get('parentesco').disable();
        }
      }
    )
  }

  public getSocioTitular(idSocioTitular: any): void {

    this._common.getOne('SociosTitulares', idSocioTitular).subscribe(
      data => {

        this.forma.get('tipoAfiliado').setValue(data.codTipoSocio);
        this.forma.get('numeroAfiliado').setValue(data.nroAfiliado);
        this.forma.get('idSocioTitular').setValue(data.id);
        
        console.log(data)
      }
    )


  }

  public onSubmit(): void {

    let socio = new Socio();
    
    socio.setCodTipoSocio(this.forma.get('tipoAfiliado').value);
    socio.setNroAfiliado(this.forma.get('numeroAfiliado').value);
    socio.setApellido(this.forma.get('apellido').value);
    socio.setNombre(this.forma.get('nombre').value);
    socio.setDni(this.forma.get('dni').value);
    socio.setFechaNacimiento(this.forma.get('fechaNacimiento').value);
    socio.setCodParentesco(this.forma.get('parentesco').value);
    socio.setEstado(this.forma.get('estado').value);

    if(!this.newOperation) {

      socio.setId(this.forma.get('id').value);
      socio.setIdSocioTitular(this.forma.get('idSocioTitular').value);

      this._socio.update(socio).subscribe(
        data => console.log(data)
      );
      
    } else {

      if(this.forma.get('parentesco').value == 'cod_parentesco_1') {

        this._socio.insert(socio).subscribe(
          data => console.log(data)
        );
      
      } else {

        this._socio.insertFamilia(socio).subscribe(
          data => console.log(data)
        );
      }

    }

    console.log(socio);

  }
}
