import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DiccionarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-datos-socio',
  templateUrl: './datos-socio.component.html',
  styles: []
})
export class DatosSocioComponent implements OnInit {

  public forma: FormGroup;
  public arrParentesco: any[];
  public arrTipoAfiliado: any[];


  constructor(private _diccionario: DiccionarioService) { }

  ngOnInit() {

    this.forma = new FormGroup({
      'tipoAfiliado':     new FormControl('', Validators.required),
      'numeroAfiliado':   new FormControl('', Validators.required),
      'apellido':         new FormControl('', Validators.required),
      'nombre':           new FormControl('', Validators.required),
      'dni':              new FormControl('', Validators.required),
      'fechaNacimiento':  new FormControl('', Validators.required),
      'parentesco':       new FormControl('', Validators.required),
      'estado':           new FormControl('', Validators.required)
    })

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

  public onSubmit(): void {




  }



}
