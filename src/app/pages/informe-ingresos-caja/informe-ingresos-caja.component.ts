import { Component, OnInit } from '@angular/core';
import { CommonService, PdfGeneratorService, FxGlobalsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-informe-ingresos-caja',
  templateUrl: './informe-ingresos-caja.component.html',
  styles: []
})
export class InformeIngresosCajaComponent implements OnInit {

  constructor(
    private _common: CommonService,
    private _pdf: PdfGeneratorService,
    private _fx: FxGlobalsService) { }

  ngOnInit() {
  }

  public buscarIngresos(event) {

    this._common.getIngresosCaja(event.fechaDesde, event.fechaHasta).subscribe(
      data => this._pdf.generarInformeCajas(data.data, event),
      err => this._fx.showAlert("Error", "No se encontraron ingresos en el rango ingresado", "error")
    );
  }

}
