import { Component, OnInit, Input,  OnChanges } from '@angular/core';
import { FxGlobalsService, PdfGeneratorService } from 'src/app/services/services.index';

@Component({
  selector: 'app-vista-previa-bono',
  templateUrl: './vista-previa-bono.component.html',
  styles: []
})
export class VistaPreviaBonoComponent implements OnInit {

  @Input() bonoPrevia = null;
  public qrCode: any;

  constructor(private _fx: FxGlobalsService, private _pdf: PdfGeneratorService) { }

  ngOnInit() {
  }

  ngOnChanges() {

    console.log(this.bonoPrevia);

    if(this.bonoPrevia != null)
      this.qrCode = this._fx.generateQR(document.getElementById("qr"), this.bonoPrevia.hash);
  }

  public makePDF() {

    console.log(this.qrCode);

    let img = this.qrCode._el.children[1].currentSrc;
    this._pdf.generarPDF(this.bonoPrevia.bono, img)
  }

}
