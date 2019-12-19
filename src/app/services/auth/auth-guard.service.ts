import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public _auth: AuthService, public router: Router) { }

  canActivate(): boolean {

    if(!this._auth.isLogued()) {

      alert("Su sesión ha expirado");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
