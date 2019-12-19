import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FxGlobalsService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private url: String = environment.apiUrl + "/generic";
  private headers: HttpHeaders;

  constructor(private _http: HttpClient, private _fxGlobals: FxGlobalsService) { 

    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  public getWithPaged( entity: String, rows: Number, page: Number, arrFilterParams?: any ): Observable<any> {

    this._fxGlobals.showSpinner();


    let params = new HttpParams()
      .set( 'rows', rows.toString() )
      .set( 'page', page.toString() )
      .set( 'entity', entity.toString() )


    // Se inicia la generación de parámetros de filtrado
    if( arrFilterParams ) {

      let i = 1;
  
      for(let key in arrFilterParams) {

        if( arrFilterParams[key] ) {
  
          params = params
                .append( `col${ i }`, arrFilterParams[key]['col'] )
                .append( `txt${ i }`, arrFilterParams[key]['txt'] );
    
          i++;
        }
      }
    }
    // Fin de generación de parámetros
    

    return this._http.get( `${this.url}/paged`, 
      { params }
    )
    .pipe(
      finalize(() => this._fxGlobals.hideSpinner())
    );
  }  
}
