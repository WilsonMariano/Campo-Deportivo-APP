import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {


  constructor() {}

  public generarPDF(bono) {

    const imgH = 15;
    const imgW = 15;

    var doc = new jsPDF();

    let logo = new Image();
    logo.src = 'assets/images/mecab.jpg';

    doc.addFont('ArialMS', 'Arial', 'normal');
    doc.setFont('Arial');

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
    doc.text(20, 10, 'Campo deportivo');
    doc.text(26, 15, 'MECAB');

    // Banda comprobante + fecha
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(2, 22, 60, 5, 0, 0, 'FD');

    doc.text(3,   26, "Comprobante:");
    doc.text(28,  26, bono.id);
    doc.text(38,  26, bono.fechaEmision);

    // // Cuerpo
    doc.text(3,   35, 'Nro Socio:');
    doc.text(3,   40, 'Nombre:');
    doc.text(3,   45, 'Tipo:');
    doc.text(3,   50, 'Parentesco:');
    doc.text(3,   55, 'Prestación:');
    doc.text(3,   60, 'F. Asignado:');
    doc.text(3,   70, 'Importe:');
    
    // doc.setFontType('normal');
    doc.text(20,  35, bono.id);
    doc.text(17,  40, bono.apellido +" "+ bono.nombre);
    doc.text(12,  45, bono.tipoSocio);
    doc.text(23,  50, bono.parentesco);
    doc.text(23,  55, bono.prestacion);
    doc.text(25,  60, bono.fechaAsignacion);
    doc.text(18,  70, '$' + bono.monto);

    /**********************************
     *************** BONO *************
     **********************************/
    // Encabezado
    doc.addImage(logo, 'JPG', 70, 5, imgH, imgW);

    doc.setFontSize(14);
    doc.text("CAMPO DEPORTIVO", 110, 10);
    doc.setFontSize(10);
    doc.text("DE LA MUTUAL DE EMPLEADOS DE COMERCIO DE ALTE. BROWN", 90, 17);

    // Banda comprobante + fecha
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(68, 22, 140, 5, 0, 0, 'FD');

    doc.text(70,  26, "Comprobante:");
    doc.text(95,  26, bono.id);
    doc.text(170, 26, "Fecha:");
    doc.text(183, 26, bono.fechaEmision);

    // Cuerpo
    doc.text(70,  33, "Nro Socio:");
    doc.text(90,  33, bono.idSocio);
    doc.text(120,  33, "Parentesco:");
    doc.text(142,  33, bono.parentesco);

    doc.text(70,  40, "Nombre:");
    doc.text(86,  40, bono.apellido +" "+ bono.nombre);

    doc.text(70,  47, "Tipo:");
    doc.text(79,  47, bono.tipoSocio);

    doc.text(70,  54, "Prestación:");
    doc.text(90,  54, bono.prestacion);

    doc.text(70,  61, "F. asignada:");
    doc.text(90,  61, bono.fechaAsignacion);
    doc.text(120, 61, "Valor:");
    doc.text(135, 61, "$" + bono.monto);

    doc.text(70,  68, "Detalle:");
    doc.text(87,  68, bono.detalle);




    doc.save("prueba.pdf");
  }
}
