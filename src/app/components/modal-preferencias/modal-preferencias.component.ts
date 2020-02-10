import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonService, AuthService, FxGlobalsService } from 'src/app/services/services.index';
import { Usuario } from 'src/app/class/class.index';
declare var $: any;

@Component({
  selector: 'app-modal-preferencias',
  templateUrl: './modal-preferencias.component.html',
  styles: []
})
export class ModalPreferenciasComponent implements OnInit {

  public forma: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private _common: CommonService,
    private _auth: AuthService,
    private _fxGlobals: FxGlobalsService) { }

  ngOnInit() {

    this.forma = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });

    $('#modalPreferencias').on('shown.bs.modal', () => this.loadUser());
  }

  public updateUser(): void {

    let usuario = new Usuario();
    usuario.setId(this._auth.getData()['id']);
    usuario.setCodRole(this._auth.getData()['role']);
    usuario.setUsuario(this.forma.get('usuario').value);
    usuario.setPassword(this.forma.get('password').value);

    this._common.updateOne('usuarios', usuario).subscribe(
      data => {

        this._fxGlobals.showAlert('Mensaje', 'Los datos han sido guardados satisfactoriamente!', 'success');

        setTimeout(() => {
          $('#modalPreferencias').modal('hide');
          this._auth.logOut();
        }, 500);
      },
      err => this._fxGlobals.showAlert('Error', 'Hubo un inconveniente al editar los datos', 'error')
    )
  }

  public loadUser(): void {

    this._common.getOne('usuarios', this._auth.getData()['id']).subscribe(
      data => { 
        this.forma.get('usuario').setValue(data.usuario);
        this.forma.get('password').setValue(data.password);
      }
    )

  }

}
