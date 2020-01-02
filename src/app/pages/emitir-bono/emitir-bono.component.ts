import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService, DiccionarioService, FxGlobalsService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-emitir-bono',
  templateUrl: './emitir-bono.component.html',
  styleUrls: ['emitir-bono.component.css']
})
export class EmitirBonoComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _socio: SocioService, 
    private _diccionario: DiccionarioService, 
    private _fxGlobals: FxGlobalsService,
    private router: Router) { }

  public forma: FormGroup;
  public arrPrestaciones = [];
  public arrParentesco = [];
  public socio = null;

  ngOnInit() {

    this.forma = new FormGroup({

      'idSocio': new FormControl({value: '', disabled: true}),
      'apellido': new FormControl({value: '', disabled: true}),
      'nombre': new FormControl({value: '', disabled: true}),
      'codParentesco': new FormControl({value: '', disabled: true}),
      'fechaAsignacion': new FormControl('', Validators.required),
      'codPrestacion': new FormControl('', Validators.required),
      'monto': new FormControl('', Validators.required),
      'descripcion': new FormControl('')

    });

    this.getDiccionario();

    this.activatedRoute.params.subscribe(
      data => { this.getSocio(data.id)}
    )
  }

  public getSocio(id): void {

    this._socio.getOne(id).subscribe(
      data => {

        this.socio = data.data;

        this.forma.get('idSocio').setValue(this.socio.id);
        this.forma.get('apellido').setValue(this.socio.apellido);
        this.forma.get('nombre').setValue(this.socio.nombre);
        this.forma.get('codParentesco').setValue(this.socio.codParentesco);
      },
      err => {

        this._fxGlobals.showAlert("Error", "El socio no existe", "error");
        this.router.navigate(['home/bonos']);
      }

    )


  }

  private getDiccionario(): void {

    this._diccionario.getWithKeys('cod_prestacion').subscribe(
      data => this.arrPrestaciones = data.data
    );

    this._diccionario.getWithKeys('cod_parentesco').subscribe(
      data => this.arrParentesco = data.data
    );
  }

}
