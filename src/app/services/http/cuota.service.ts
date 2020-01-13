import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';


@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private url: String = environment.apiUrl + "/cuotas";

  constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) { }

  public getCoutas(idSocioTitular: Number): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.get(`${this.url}/getCuotas/${idSocioTitular}`
    )
        .pipe(
            finalize(() => this._fxGlobals.hideSpinner())
        );
}
}
