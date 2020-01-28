import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-buscar-fechas',
  templateUrl: './buscar-fechas.component.html',
  styles: []
})
export class BuscarFechasComponent implements OnInit {
  
  @Output() outputData = new EventEmitter(); 

  public forma: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.forma = this.fb.group({
      'fechaDesde': new FormControl('2019-01-01',  Validators.required),
      'fechaHasta': new FormControl('2020-12-01',  Validators.required)
    });
  }

  public onSubmit() {

    this.outputData.emit({
      'fechaDesde': this.forma.get('fechaDesde').value,
      'fechaHasta': this.forma.get('fechaHasta').value
    });
  }

}
