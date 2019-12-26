import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';

@Injectable({
    providedIn: 'root'
})
export class DiccionarioService {

    private url: String = environment.apiUrl + "/diccionario";
    private headers: HttpHeaders;

    constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) {

        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    public getWithKeys(key: String): Observable<any> {

      this._fxGlobals.showSpinner();


      let params = new HttpParams().set( 'key', key.toString() )

      return this._http.get(`${this.url}/getWithKeys/`, { params })
        .pipe(
            finalize(() => this._fxGlobals.hideSpinner())
        );
    }
}