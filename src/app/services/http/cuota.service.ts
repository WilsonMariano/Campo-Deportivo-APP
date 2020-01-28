import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';
import { Cuota } from 'src/app/class/class.index';


@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private url: String = environment.apiUrl + "/cuotas";
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) {

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
   }

  public getCoutas(idSocioTitular: Number): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.get(`${this.url}/getCuotas/${idSocioTitular}`
    )
        .pipe(
            finalize(() => this._fxGlobals.hideSpinner())
        );
  }

  public getLastVencimiento(idSocioTitular): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.get(`${this.url}/getLastVencimiento/${idSocioTitular}`
    )
        .pipe(
            finalize(() => this._fxGlobals.hideSpinner())
        );
  }

  public getBetweenDates(fechaDesde, fechaHasta): Observable<any> {

    this._fxGlobals.showSpinner();

    let params = new HttpParams()
      .set('fechaDesde', fechaDesde)
      .set('fechaHasta', fechaHasta);
    

    return this._http.get(`${this.url}/getBetweenDates`,
    { params }
    )
        .pipe(
            finalize(() => this._fxGlobals.hideSpinner())
        );
  }

  public insertCuota(cuota: Cuota): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.post(
        `${this.url}/insert`,
        cuota
    )
    .pipe(
      finalize(() => this._fxGlobals.hideSpinner())
    );
  }
}
