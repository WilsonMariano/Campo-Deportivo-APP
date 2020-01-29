import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class ValoresService { 

    private url: String = environment.apiUrl + "/valores";

    constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) { }

    public getValor(codPrestacion, codParentesco, codDia, codTipoSocio, edad): Observable<any> {

        let params = new HttpParams()
            .set( 'codPrestacion', codPrestacion )
            .set( 'codParentesco', codParentesco )
            .set( 'codDia', codDia )
            .set( 'codTipoSocio', codTipoSocio )
            .set( 'edad', edad );

            this._fxGlobals.showSpinner();

        return this._http.get(
            `${this.url}/getValor`,
            { params }
        )
        .pipe(
            finalize(() => this._fxGlobals.hideSpinner())
        );
    }

}