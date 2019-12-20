import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datos-socio',
  templateUrl: './datos-socio.component.html',
  styles: []
})
export class DatosSocioComponent implements OnInit {

  public forma: FormGroup;

  constructor() { }

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
  }

}
