import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';

@Injectable({
    providedIn: 'root'
})
export class SocioService {

    private url: String = environment.apiUrl + "/socios";
    private headers: HttpHeaders;

    constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) {

        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    public getGroupFamily(idSocioTitular: Number): Observable<any> {

        this._fxGlobals.showSpinner();

        return this._http.get(`${this.url}/getGroupFamily/${idSocioTitular}`
        )
            .pipe(
                finalize(() => this._fxGlobals.hideSpinner())
            );
    }
}