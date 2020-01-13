import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { FxGlobalsService } from './fx-globals.service';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {


  constructor(private _fx: FxGlobalsService) {}

  public generarPDF(bono, qrCode) {

    const imgH = 15;
    const imgW = 15;

    var doc = new jsPDF();

    let logo = new Image();
    logo.src = 'assets/images/mecab.jpg';

    // doc.addFont('ArialMS', 'Arial', 'normal');
    // doc.setFont('Arial');
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
    doc.addImage(logo, 'JPG', 5, 5, imgH, imgW);
    doc.setFontSize(10);
    doc.text(30, 10, 'Campo deportivo');
    doc.text(36, 15, 'MECAB');

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
    doc.addImage(logo, 'JPG', 70, 5, imgH, imgW);

    doc.setFontSize(14);
    doc.text("CAMPO DEPORTIVO", 115, 10);
    doc.setFontSize(10);
    doc.text("DE LA MUTUAL DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 90, 17);

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

    const imgH = 15;
    const imgW = 15;

    var doc = new jsPDF();

    doc.setFont('helvetica');

    let logo = new Image();
    logo.src = 'assets/images/mecab.jpg';

    /**********************************
     ************* DIVISORES **********
     **********************************/

    // Superior
    doc.line(0, 23,   115, 23);
    // Base
    doc.line(0, 73,   115, 73);
    //Costado
    doc.line(115, 0,  115, 73);

    /**
     * ENCABEZADO
     */
    doc.addImage(logo, 'JPG', 5, 5, imgH, imgW);

    doc.setFontSize(10);
    doc.text("CAMPO DEPORTIVO DE LA MUTUAL DE", 30, 10);
    doc.text("EMPLEADOS DE COMERCIO DE ALTE. BROWN", 25, 17);

    

    /**
     * CUERPO
     */
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

    /**********************************
     ************* DIVISORES **********
     **********************************/
    // doc.line(0, 80, 220, 80);
    // doc.line(65, 0, 65, 80);

    // doc.autoPrint({variant: 'non-conform'});
    doc.output('dataurlnewwindow');


  }

  
}
