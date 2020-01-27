import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DiccionarioService, FxGlobalsService } from 'src/app/services/services.index';
import { BonoService } from 'src/app/services/http/bono.service';

@Component({
  selector: 'app-listar-bonos-asignacion',
  templateUrl: './listar-bonos-asignacion.component.html',
  styles: []
})
export class ListarBonosAsignacionComponent implements OnInit {

  public forma: FormGroup;
  public arrPrestaciones = [];
  public arrBonos = [];

  constructor(private fb: FormBuilder, private _diccionario: DiccionarioService, private _bono: BonoService, private _fx: FxGlobalsService) { }

  ngOnInit() {

    this.forma = this.fb.group({
      'fechaAsignacion': new FormControl('',  Validators.required),
      'codPrestacion': new FormControl('',  Validators.required)
    });

    this.getPrestaciones();
  }

  private getPrestaciones(): void {

    this._diccionario.getWithKeys('cod_prestacion').subscribe(
      data => { this.arrPrestaciones = data.data; console.log(data)}
    );
  }

  public onSubmit(): void {

    this._bono.getByDateAndPrestacion(this.forma.get('fechaAsignacion').value, this.forma.get('codPrestacion').value).subscribe(
      data => this.arrBonos = data.data,
      err => this._fx.showAlert("Alerta", "No se encontraron bonos para la fecha ingresada", "warning")
    );

  }

}
