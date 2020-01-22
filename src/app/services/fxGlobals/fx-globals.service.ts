import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Md5 } from 'ts-md5/dist/md5';
declare var QRCode: any;

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

  public showQuestionAlert(title: string, text: string, icon) {

    let alertOptions = {
      title,
      text,
      icon,
      buttons: true,
      // buttons: {
      //   cancel: {
      //     text: "Cancelar",
      //     value: null,
      //     visible: false,
      //     className: "",
      //     closeModal: true,
      //   },
      //   confirm: {
      //     text: "Aceptar",
      //     value: true,
      //     visible: true,
      //     className: "",
      //     closeModal: true
      //   }
      // },
      dangerMode: true
    };


    // Retorno una promesa con el resultado según lo que haya presionado el usuario
    return new Promise(( resolve, reject ) => {

      swal( alertOptions ).then(( response ) => {

        if(response)
           resolve(true);

        else
          reject(false);

      });
    });    
  }

  public generateQR(element, data): any {

    let qrcode = new QRCode(element, {
      text: data,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    return qrcode;

  }

  public dateFormat(date: String): String {

    let separator = '-';
    let d = date.split('-');

    return d[2] + separator + d[1] + separator + d[0];
  }

  public timeFormat(time: String): String {

    let separator = ':';
    let d = time.split(':');

    return d[0] + separator + d[1];
  }

  public generateHash(data: String): String {

    return Md5.hashStr(<string>data).toString();
  }

  public capitalize(text: String) { 

    let arr = text.split(' ').map(e=> e[0].toUpperCase() + e.substring(1, e.length));
    return arr.join(' ');
  }
}

