import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-socio',
  templateUrl: './buscar-socio.component.html',
  styles: []
})
export class BuscarSocioComponent implements OnInit {
  @Output() value = new EventEmitter();

  public forma: FormGroup;

  constructor() { }

  ngOnInit() {

    this.forma = new FormGroup({
      'valor': new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {

    this.value.emit(this.forma.get('valor').value);

  }

}
