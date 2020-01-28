import { Component, OnInit } from '@angular/core';
import { CuotaService, FxGlobalsService, PdfGeneratorService } from 'src/app/services/services.index';

@Component({
  selector: 'app-informe-cuotas',
  templateUrl: './informe-cuotas.component.html',
  styles: []
})
export class InformeCuotasComponent implements OnInit {

  constructor(
    private _cuotas: CuotaService, 
    private _fx: FxGlobalsService,
    private _pdf: PdfGeneratorService) { }

  ngOnInit() {
  }

  public buscarCuotas(event) {

    this._cuotas.getBetweenDates(event.fechaDesde, event.fechaHasta).subscribe(
      data => this._pdf.generarInformeCuotas(data.data, event),
      err => this._fx.showAlert("Error", "No se encontraron cuotas en el rango ingresado", "error")
    );
  }

}
