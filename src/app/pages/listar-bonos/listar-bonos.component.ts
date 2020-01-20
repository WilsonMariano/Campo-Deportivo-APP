import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BonoService } from 'src/app/services/http/bono.service';
import { FxGlobalsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-listar-bonos',
  templateUrl: './listar-bonos.component.html',
  styleUrls: ['listar-bonos.component.css']
})
export class ListarBonosComponent implements OnInit {

  public forma: FormGroup;
  public arrBonos = [];
  public bonoPrevia = null;

  constructor(private fb: FormBuilder, private _bonos: BonoService, private _fx: FxGlobalsService) { }

  ngOnInit() {

    this.forma = this.fb.group({
      'fechaDesde': new FormControl('',  Validators.required),
      'fechaHasta': new FormControl('',  Validators.required)
    });
  }

  public onSubmit(): void {

    this._bonos.getBetweenDate(this.forma.get('fechaDesde').value, this.forma.get('fechaHasta').value).subscribe(
      data => {this.arrBonos = data.data; console.log(data);}
    )
    
  }

  public anular(id): void {

   this._fx.showQuestionAlert("Confirmación", "¿Está seguro de anular el bono?", "warning").then(

    () => this._bonos.cancel(id).subscribe(
        () => {
          this._fx.showAlert("Perfecto",  "El bono se ha anulado", "success");
          this.onSubmit();
        }
    )
   );
  }

}
