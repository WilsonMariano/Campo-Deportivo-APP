import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { FxGlobalsService } from './fx-globals.service';
import { Bono } from 'src/app/class/class.index';
declare var numeroALetras: any;
declare var moment: any;


@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private logo;
  private logoH = 15;
  private logoW = 15;


  constructor(private _fx: FxGlobalsService) {

    this.logo = new Image();
    this.logo.src = 'assets/images/mecab.jpg';
  }

  public generarBono(bono, qrCode) {

   /**
    * Asigno logo y encabezado según tipo de afiliado
   */
    let encabezadoBono;
    let encabezadoTalon;

    if(bono.codTipoSocio == 'cod_tipo_socio_2') {

      this.logo.src = 'assets/images/mecab.jpg';
      encabezadoTalon = "MECAB";
      encabezadoBono = "DE LA MUTUAL DE EMPLEADOS DE COMERCIO DE ALTE. BROWN";
      
    } else {

      this.logo.src = 'assets/images/secab.png';
      encabezadoTalon = "SECAB";
      encabezadoBono = "DEL SINDICATO DE EMPLEADOS DE COMERCIO DE ALTE. BROWN";
    }

    var doc = new jsPDF();
    doc.setFont('helvetica');

    /**********************************
     ************* DIVISORES **********
     **********************************/
    doc.line(0, 80, 220, 80);
    doc.line(65, 0, 65, 80);

    /**********************************
     ************** TALÓN *************
     **********************************/
    // Encabezado
    doc.addImage(this.logo, 'JPG', 5, 5, this.logoH, this.logoW);
    doc.setFontSize(10);
    doc.text(30, 10, 'Campo deportivo');
    doc.text(36, 15, encabezadoTalon);

    // Banda comprobante + fecha
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(5, 22, 57, 5, 0, 0, 'FD');

    doc.text(6,   26, "Comp. N°:");
    doc.text(23,  26, bono.id);
    doc.text(38,  26, this._fx.dateFormat(bono.fechaEmision));

    // // Cuerpo
    doc.setFontType("bold");
    doc.text(6,   35, 'Nro Socio:');
    doc.text(6,   40, 'Nombre:');
    doc.text(6,   45, 'Tipo:');
    doc.text(6,   50, 'Parentesco:');
    doc.text(6,   55, 'Prestación:');
    doc.text(6,   60, 'F. Asignada:');
    doc.text(6,   70, 'Importe:');
    
    doc.setFontType('normal');
    doc.text(23,  35, bono.idSocio);
    doc.text(22,  40, bono.apellido +" "+ bono.nombre);
    doc.text(15,  45, bono.tipoSocio);
    doc.text(26,  50, bono.parentesco);
    doc.text(26,  55, bono.prestacion);
    doc.text(28,  60, this._fx.dateFormat(bono.fechaAsignacion) +" "+ this._fx.timeFormat(bono.horaAsignacion));
    doc.text(21,  70, '$' + bono.monto);

    /**********************************
     *************** BONO *************
     **********************************/
    
    // Encabezado
    doc.addImage(this.logo, 'JPG', 70, 5, this.logoH, this.logoW);

    doc.setFontSize(14);
    doc.text("CAMPO DEPORTIVO", 115, 10);
    doc.setFontSize(10);
    doc.text(encabezadoBono, 90, 17);

    // Banda comprobante + fecha
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(68, 22, 140, 5, 0, 0, 'FD');

    doc.text(70,  26, "Comprobante:");
    doc.text(95,  26, bono.id);
    doc.text(170, 26, "Fecha:");
    doc.text(183, 26, this._fx.dateFormat(bono.fechaEmision));

    // Cuerpo
    doc.setFontType("bold");
    doc.text(70,  36, "Nro Socio:");
    doc.text(127, 36, "Parentesco:");
    doc.text(70,  43, "Nombre:");
    doc.text(70,  50, "Tipo:");
    doc.text(70,  57, "Prestación:");
    doc.text(70,  64, "F. asignada:");
    doc.text(127, 64, "Importe:");
    doc.text(70,  71, "Detalle:");

    doc.setFontType("normal");
    doc.text(90,  36, bono.idSocio);
    doc.text(149, 36, bono.parentesco);
    doc.text(86,  43, bono.apellido +" "+ bono.nombre);
    doc.text(79,  50, bono.tipoSocio);
    doc.text(90,  57, bono.prestacion);
    doc.text(91,  64, this._fx.dateFormat(bono.fechaAsignacion) +"  "+ this._fx.timeFormat(bono.horaAsignacion) + "hs");
    doc.text(142, 64, "$" + bono.monto);
    doc.text(87,  71, bono.detalle);

    // QRcode
    doc.addImage(qrCode, 'PNG', 165, 33);

    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');
  }

  
  public generarCarnet(socio,  qrCode) {


    /**
    * Asigno logo y encabezado según tipo de afiliado
    */
    let encabezado;

    if(socio.codTipoSocio == 'cod_tipo_socio_2') {

      this.logo.src = 'assets/images/mecab.jpg';
      encabezado = "CAMPO DEPORTIVO DE LA MUTUAL DE";
      
    } else {

      this.logo.src = 'assets/images/secab.png';
      encabezado = "CAMPO DEPORTIVO DEL SINDICATO DE";
    }

    var doc = new jsPDF();
    doc.setFont('helvetica');

    /**********************************
     ************* DIVISORES **********
     **********************************/

    // Superior
    doc.line(0, 23,   115, 23);
    // Base
    doc.line(0, 73,   115, 73);
    //Costado
    doc.line(115, 0,  115, 73);

    /***********************************
     ************** ENCABEZADO *********
     ***********************************/
    doc.addImage(this.logo, 'JPG', 5, 5, this.logoH, this.logoW);

    doc.setFontSize(10);
    doc.text(encabezado, 30, 10);
    doc.text("EMPLEADOS DE COMERCIO DE ALTE. BROWN", 25, 17);

    

    /*************************************
     ************** CUERPO ***************
     *************************************/
    doc.setFontType("bold");
    doc.text(6,   30, 'Nro. socio:');
    doc.text(6,   35, 'Nombre:');
    doc.text(6,   40, 'DNI:');
    doc.text(6,   45, 'Nacimiento:');
    doc.text(6,   50, 'Tipo socio:');
    doc.text(6,   55, 'Nro. afiliado:');
    doc.text(6,   60, 'Parentesco:');
    doc.text(6,   65, 'Socio desde:');

    doc.setFontType("normal");
    doc.text(31,  30, socio.id);
    doc.text(31,  35, socio.apellido +" "+ socio.nombre);
    doc.text(31,  40, socio.dni);
    doc.text(31,   45, this._fx.dateFormat(socio.fechaNacimiento));
    doc.text(31,   50, socio.tipoAfiliado);
    doc.text(31,   55, socio.nroAfiliado);
    doc.text(31,   60, socio.parentesco);
    doc.text(31,   65, this._fx.dateFormat(socio.fechaIngreso));


    // QR CODE
    doc.addImage(qrCode, 'PNG', 70, 27);

    // Configuro autoprint y apertura en pestaña nueva
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');
  }


  public generarRecibo(cuota): void {

    var doc = new jsPDF();
    doc.setFont('helvetica');

    // Divisor
    doc.line(0, 150,  220, 150);

    /******************************
     ********** ORIGINAL **********
     ******************************/
    // Encabezado
    doc.setFontSize(16);
    doc.text("CAMPO DEPORTIVO", 77, 17);
    doc.setFontSize(13);
    doc.text("DE LA MUTUAL DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 30, 24);
    doc.setFontSize(11);
    doc.text("Pino Nº 1955, Burzaco", 83, 31);

     
    // Cuerpo
    doc.setFontSize(13);
    doc.setFontType('bold');
    doc.text("Recibo Nº ", 8, 48);
    doc.text("Fecha: ", 165, 48);

    doc.setFontSize(12);
    doc.text("Recibimos del sr/sra.: ", 8, 73);
    doc.text("La cantidad de pesos: ", 8, 83);
    doc.text("En concepto de: ", 8, 93);
    doc.text("______________________", 145, 120);
    doc.text("Firma", 165, 125);

    doc.setFontType('normal');
    doc.text(cuota.id, 30, 48);
    doc.text(this._fx.dateFormat(cuota.fechaPago), 182, 48);
    doc.text(`${cuota.nombre} ${cuota.apellido}, socio Nro.: ${cuota.idSocio}`, 55, 73);
    doc.text(`${numeroALetras(cuota.monto)} ($${cuota.monto})`, 55, 83);
    doc.text(cuota.descripcion, 50, 93);

    
    /*************************
     ******* DUPLICADO ****** 
     ************************/
    // Encabezado
    doc.setFontSize(16);
    doc.text("CAMPO DEPORTIVO", 77, 170);
    doc.setFontSize(13);
    doc.text("DE LA MUTUAL DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 30, 177);
    doc.setFontSize(11);
    doc.text("Pino Nº 1955, Burzaco", 83, 184);

    // Cuerpo
    doc.setFontSize(13);
    doc.setFontType('bold');
    doc.text("Recibo Nº ", 8, 201);
    doc.text("Fecha: ", 165, 201);

    doc.setFontSize(12);
    doc.text("Recibimos del sr/sra.: ", 8, 226);
    doc.text("La cantidad de pesos: ", 8, 236);
    doc.text("En concepto de: ", 8, 246);
    doc.text("______________________", 145, 273);
    doc.text("Firma", 165, 278);

    doc.setFontType('normal');
    doc.text(cuota.id, 30, 201);
    doc.text(this._fx.dateFormat(cuota.fechaPago), 182, 201);
    doc.text(`${cuota.nombre} ${cuota.apellido}, socio Nro.: ${cuota.idSocio}`, 55, 226);
    doc.text(`${numeroALetras(cuota.monto)} ($${cuota.monto})`, 55, 236);
    doc.text(cuota.descripcion, 50, 246);
    

    // Configuro autoprint y apertura en pestaña nueva
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');
  }

  public generarInformeBonos(bonos: Array<any>, fechas): void {

    let hoy = moment().format('YYYY-MM-DD');
    let numPagina = 1;
    let row = 65;

    var doc = new jsPDF();
    doc.setFont('helvetica');
    
    doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
    

    bonos.forEach((element, i) => {

      doc.text(this._fx.dateFormat(element.fechaEmision)    , 10, row);
      doc.text(element.idSocio                              , 35, row);
      doc.text(`${element.apellido} ${element.nombre}`      , 60, row);
      doc.text(element.prestacion                           , 130, row);
      doc.text(element.monto                                , 180, row);

      row += 5;


      // Agrego nueva cabecera
      if(row >= 275) {

        numPagina++;
        row = 65;
        doc.addPage();
        doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
      }

      // Agrego totales
      if(i == bonos.length - 1) {

        doc.line(0, row,  220, row);

        doc.setFontType('bold');
        doc.text("TOTAL", 130, row + 5);
        doc.text(this.sumarTotales(bonos).toString(), 180, row + 5);
      }
      
    });
    
    // Configuro autoprint y apertura en pestaña nueva
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');


    function generarCabecera(doc, numPagina, hoy, rangoFechas, _fx) {

      // Encabezado
      doc.setFontSize(14);
      doc.text("CAMPO DEPORTIVO", 77, 17);
      doc.setFontSize(13);
      doc.text("DEL SINDICATO DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 30, 24);
      doc.setFontSize(12);
      doc.setFontType('bold');
      doc.text("INFORME DE EMISIÓN DE BONOS", 70, 33);
      doc.setFontSize(11);
      doc.setFontType('normal');
      doc.text(`desde ${_fx.dateFormat(rangoFechas.fechaDesde)} al ${_fx.dateFormat(rangoFechas.fechaHasta)}`, 75, 40);
      doc.text(`Fecha: ${_fx.dateFormat(hoy)}`, 10, 45);
      doc.text(`Página: ${numPagina}`, 180, 45);

      // Divisor
      doc.line(0, 50,  220, 50);
      doc.line(0, 58,  220, 58);

      doc.setFontType('bold');
      doc.text("Fecha", 10, 55);
      doc.text("N° Socio", 35, 55);
      doc.text("Apellido y nombre", 60, 55);
      doc.text("Prestación", 130, 55);
      doc.text("Monto", 180, 55);

      doc.setFontType('normal');
      doc.setFontSize('10');

      return doc;
    }
  }

  private sumarTotales(arr: Array<any>): Number {

    let sum = 0;

    arr.forEach(element => sum += Number.parseFloat(element['monto']));

    return sum;
  }

  public generarInformeCuotas(cuotas: Array<any>, fechas): void {

    let hoy = moment().format('YYYY-MM-DD');
    let numPagina = 1;
    let row = 65;

    var doc = new jsPDF();
    doc.setFont('helvetica');
    
    doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
    

    cuotas.forEach((element, i) => {

      doc.text(this._fx.dateFormat(element.fechaPago)    , 10, row);
      doc.text(element.idSocio                              , 35, row);
      doc.text(`${element.apellido} ${element.nombre}`      , 60, row);
      doc.text(element.descripcion                          , 130, row);
      doc.text(element.monto                                , 180, row);

      row += 5;


      // Agrego nueva cabecera
      if(row >= 275) {

        numPagina++;
        row = 65;
        doc.addPage();
        doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
      }

      // Agrego totales
      if(i == cuotas.length - 1) {

        doc.line(0, row,  220, row);

        doc.setFontType('bold');
        doc.text("TOTAL", 130, row + 5);
        doc.text(this.sumarTotales(cuotas).toString(), 180, row + 5);
      }
      
    });
    
    // Configuro autoprint y apertura en pestaña nueva
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');


    function generarCabecera(doc, numPagina, hoy, rangoFechas, _fx) {

      // Encabezado
      doc.setFontSize(14);
      doc.text("CAMPO DEPORTIVO", 77, 17);
      doc.setFontSize(13);
      doc.text("DEL SINDICATO DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 30, 24);
      doc.setFontSize(12);
      doc.setFontType('bold');
      doc.text("INFORME DE PAGO DE CUOTAS", 70, 33);
      doc.setFontSize(11);
      doc.setFontType('normal');
      doc.text(`desde ${_fx.dateFormat(rangoFechas.fechaDesde)} al ${_fx.dateFormat(rangoFechas.fechaHasta)}`, 75, 40);
      doc.text(`Fecha: ${_fx.dateFormat(hoy)}`, 10, 45);
      doc.text(`Página: ${numPagina}`, 180, 45);

      // Divisor
      doc.line(0, 50,  220, 50);
      doc.line(0, 58,  220, 58);

      doc.setFontType('bold');
      doc.text("Fecha", 10, 55);
      doc.text("N° Socio", 35, 55);
      doc.text("Apellido y nombre", 60, 55);
      doc.text("Detalle", 130, 55);
      doc.text("Monto", 180, 55);

      doc.setFontType('normal');
      doc.setFontSize('10');

      return doc;
    }
  }

  public generarInformeCajas(ingresos: Array<any>, fechas): void {

    let hoy = moment().format('YYYY-MM-DD');
    let numPagina = 1;
    let row = 65;

    var doc = new jsPDF();
    doc.setFont('helvetica');
    
    doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
    

    ingresos.forEach((element, i) => {

      doc.text(this._fx.dateFormat(element.fecha)    , 10, row);
      doc.text(element.idSocio                              , 35, row);
      doc.text(`${element.apellido} ${element.nombre}`      , 60, row);
      doc.text(element.descripcion                          , 130, row);
      doc.text(element.monto                                , 180, row);

      row += 5;


      // Agrego nueva cabecera
      if(row >= 275) {

        numPagina++;
        row = 65;
        doc.addPage();
        doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
      }

      // Agrego totales
      if(i == ingresos.length - 1) {

        doc.line(0, row,  220, row);

        doc.setFontType('bold');
        doc.text("TOTAL", 130, row + 5);
        doc.text(this.sumarTotales(ingresos).toString(), 180, row + 5);
      }
      
    });
    
    // Configuro autoprint y apertura en pestaña nueva
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');


    function generarCabecera(doc, numPagina, hoy, rangoFechas, _fx) {

      // Encabezado
      doc.setFontSize(14);
      doc.text("CAMPO DEPORTIVO", 77, 17);
      doc.setFontSize(13);
      doc.text("DEL SINDICATO DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 30, 24);
      doc.setFontSize(12);
      doc.setFontType('bold');
      doc.text("INFORME DE INGRESO DE CAJA", 70, 33);
      doc.setFontSize(11);
      doc.setFontType('normal');
      doc.text(`desde ${_fx.dateFormat(rangoFechas.fechaDesde)} al ${_fx.dateFormat(rangoFechas.fechaHasta)}`, 75, 40);
      doc.text(`Fecha: ${_fx.dateFormat(hoy)}`, 10, 45);
      doc.text(`Página: ${numPagina}`, 180, 45);

      // Divisor
      doc.line(0, 50,  220, 50);
      doc.line(0, 58,  220, 58);

      doc.setFontType('bold');
      doc.text("Fecha", 10, 55);
      doc.text("N° Socio", 35, 55);
      doc.text("Apellido y nombre", 60, 55);
      doc.text("Descripción", 130, 55);
      doc.text("Monto", 180, 55);

      doc.setFontType('normal');
      doc.setFontSize('10');

      return doc;
    }
  }

  public generarInformeIngresos(ingresos: Array<any>, fechas): void {

    let hoy = moment().format('YYYY-MM-DD');
    let numPagina = 1;
    let row = 65;

    var doc = new jsPDF();
    doc.setFont('helvetica');
    
    doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
    

    ingresos.forEach((element, i) => {

      doc.text(this._fx.dateFormat(element.fecha)           , 10, row);
      doc.text(this._fx.timeFormat(element.hora)            , 35, row);
      doc.text(element.idSocio                              , 60, row);
      doc.text(`${element.apellido} ${element.nombre}`      , 130, row);

      row += 5;


      // Agrego nueva cabecera
      if(row >= 275) {

        numPagina++;
        row = 65;
        doc.addPage();
        doc = generarCabecera(doc, numPagina, hoy, fechas, this._fx);
      }
      
    });
    
    // Configuro autoprint y apertura en pestaña nueva
    doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');


    function generarCabecera(doc, numPagina, hoy, rangoFechas, _fx) {

      // Encabezado
      doc.setFontSize(14);
      doc.text("CAMPO DEPORTIVO", 77, 17);
      doc.setFontSize(13);
      doc.text("DEL SINDICATO DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 30, 24);
      doc.setFontSize(12);
      doc.setFontType('bold');
      doc.text("INFORME DE INGRESOS", 75, 33);
      doc.setFontSize(11);
      doc.setFontType('normal');
      doc.text(`desde ${_fx.dateFormat(rangoFechas.fechaDesde)} al ${_fx.dateFormat(rangoFechas.fechaHasta)}`, 75, 40);
      doc.text(`Fecha: ${_fx.dateFormat(hoy)}`, 10, 45);
      doc.text(`Página: ${numPagina}`, 180, 45);

      // Divisor
      doc.line(0, 50,  220, 50);
      doc.line(0, 58,  220, 58);

      doc.setFontType('bold');
      doc.text("Fecha", 10, 55);
      doc.text("Hora", 35, 55);
      doc.text("Nº socio", 60, 55);
      doc.text("Apellido y nombre", 130, 55);

      doc.setFontType('normal');
      doc.setFontSize('10');

      return doc;
    }
  }


  
}
