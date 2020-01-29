import { Component, OnInit } from '@angular/core';
import { UsuarioService, FxGlobalsService, AuthService } from '../services/services.index';
import { Usuario } from '../class/class.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var init_plugins: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public forma: FormGroup;

  constructor(
    private _usuario: UsuarioService, 
    private _fxGlobals: FxGlobalsService, 
    private router: Router,
    private _auth: AuthService) { }

  ngOnInit() {

    // Inicializo plugins sidebar y corto spinner
    init_plugins();

    this.validateLogin();

    this.forma = new FormGroup({
      'usuario':    new FormControl('', Validators.required),
      'password':   new FormControl('', Validators.required),
      'recordarme': new FormControl('')
    });

    this.loadData();
  }

  public getField(field): any { return this.forma.get(field).value}

  public onSubmit(): void {

    if(this.getField('recordarme'))
      this.saveData();
    else
      this.clearData();

    let usuario = new Usuario();
    usuario.setUsuario(this.getField('usuario'));
    usuario.setPassword(this.getField('password'));

    this._usuario.login(usuario).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('token', data.token);
        this.router.navigate(['home/dashboard']);
      },
      () => this._fxGlobals.showAlert("Error", "Usuario o contraseña inválidas", "error")
    );
  }

  private saveData(): void {

    localStorage.setItem('usuario', this.getField('usuario'));
  }

  private loadData(): void {

    let usuario = localStorage.getItem('usuario');

    if(usuario != null) {

      this.forma.get('usuario').setValue(usuario);
      this.forma.get('recordarme').setValue(true);
    }
  }

  private clearData(): void {

    localStorage.removeItem('usuario');
  }

  private validateLogin() {

    if(this._auth.isLogued())
      this.router.navigate(['home/dashboard']);
  }

}
