import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';


@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  private url: String = environment.apiUrl + "/ingresos";
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) {

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
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
}
