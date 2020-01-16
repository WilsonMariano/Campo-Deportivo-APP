import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BonoService } from 'src/app/services/http/bono.service';

@Component({
  selector: 'app-listar-bonos',
  templateUrl: './listar-bonos.component.html',
  styles: []
})
export class ListarBonosComponent implements OnInit {

  public forma: FormGroup;
  public arrBonos = [];

  constructor(private fb: FormBuilder, private _bonos: BonoService) { }

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

}
