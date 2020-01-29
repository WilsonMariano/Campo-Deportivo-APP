import { Component, OnInit } from '@angular/core';
import { FxGlobalsService, PdfGeneratorService, IngresoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-informe-ingresos',
  templateUrl: './informe-ingresos.component.html',
  styles: []
})
export class InformeIngresosComponent implements OnInit {

  constructor(
    private _ingreso: IngresoService,
    private _fx: FxGlobalsService,
    private _pdf: PdfGeneratorService) { }

  ngOnInit() {
  }

  public buscarIngresos(event) {

    this._ingreso.getBetweenDates(event.fechaDesde, event.fechaHasta).subscribe(
      data => this._pdf.generarInformeIngresos(data.data, event),
      err => this._fx.showAlert("Error", "No se encontraron ingresos en el rango ingresado", "error")
    );
  }

}
