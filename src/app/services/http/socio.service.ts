import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';
import { Socio } from 'src/app/class/class.index';

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

    public getGroupFamily(idSocioTitular: Number, codParentesco: String): Observable<any> {

        this._fxGlobals.showSpinner();

        return this._http.get(`${this.url}/getGroupFamily/${idSocioTitular}/${codParentesco}`
        )
            .pipe(
                finalize(() => this._fxGlobals.hideSpinner())
            );
    }

    public getOne(idSocio: Number): Observable<any> {

        this._fxGlobals.showSpinner();

        return this._http.get(`${this.url}/getOne/${idSocio}`
        )
            .pipe(
                finalize(() => this._fxGlobals.hideSpinner())
            );
    }

    public getTitular(idSocio: Number): Observable<any> {

        this._fxGlobals.showSpinner();

        return this._http.get(`${this.url}/getTitular/${idSocio}`
        )
            .pipe(
                finalize(() => this._fxGlobals.hideSpinner())
            );
    }

    public insert(socio: Socio): Observable<any> {

        this._fxGlobals.showSpinner();
    
        return this._http.post(
            `${this.url}/insert`,
            socio
        )
        .pipe(
          finalize(() => this._fxGlobals.hideSpinner())
        );
      }

      public insertFamilia(socio: Socio): Observable<any> {

        this._fxGlobals.showSpinner();
    
        return this._http.post(
            `${this.url}/insertFamilia`,
            socio
        )
        .pipe(
          finalize(() => this._fxGlobals.hideSpinner())
        );
      }


    public update(socio: Socio): Observable<any> {

    this._fxGlobals.showSpinner();

    return this._http.post(
        `${this.url}/update`,
        socio
    )
    .pipe(
        finalize(() => this._fxGlobals.hideSpinner())
    );
    }
}