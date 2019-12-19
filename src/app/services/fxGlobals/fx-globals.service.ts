import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

declare var swal : any;

@Injectable({
  providedIn: 'root'
})
export class FxGlobalsService {

  constructor(private _spinner: NgxSpinnerService) { }

  public showSpinner(){

    this._spinner.show();
  }

  public hideSpinner(){

    setTimeout(() => this._spinner.hide(), 500);
  }

  public showAlert(title: string, text: string, status) {

    swal( title, text, status );
  }
}
