import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';
import { Bono } from 'src/app/class/class.index';

@Injectable({
  providedIn: 'root'
})
export class BonoService {

  private url: String = environment.apiUrl + "/bonos";
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) { 

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  public insert( bono: Bono ): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.post(
        `${this.url}/insert`,
        bono
    )
    .pipe(
      finalize(() => this._fxGlobals.hideSpinner())
    );
  }
}
