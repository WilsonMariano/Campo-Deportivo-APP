import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';

@Injectable({
    providedIn: 'root'
})
export class FuncionalidadesService {

    private url: String = environment.apiUrl + "/funcionalidades";
    private headers: HttpHeaders;

    constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) {

        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    public getCodPrestacion(codTipoSocio: String): Observable<any> {

        this._fxGlobals.showSpinner();

        let params = new HttpParams()
        .set( 'codTipoSocio', codTipoSocio.toString() );


        return this._http.get(`${this.url}/getCodPrestacion`,
            { params }
        )
            .pipe(
                finalize(() => this._fxGlobals.hideSpinner())
            );
    }

    public getFuncionalidad(codTipoSocio: String, codFuncionalidad: String): Observable<any> {

        this._fxGlobals.showSpinner();

        let params = new HttpParams()
        .set( 'codTipoSocio',       codTipoSocio.toString() )
        .set( 'codFuncionalidad',   codFuncionalidad.toString() );


        return this._http.get(`${this.url}/getFuncionalidad`,
            { params }
        )
            .pipe(
                finalize(() => this._fxGlobals.hideSpinner())
            );
    }

}