import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Usuario } from 'src/app/class/class.index';
import { FxGlobalsService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: String = environment.apiUrl + "/usuarios";
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) { 

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  public login( usuario: Usuario ): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.post(
        `${this.url}/login`,
        usuario
    )
    .pipe(
      finalize(() => this._fxGlobals.hideSpinner())
    );
  }
}
