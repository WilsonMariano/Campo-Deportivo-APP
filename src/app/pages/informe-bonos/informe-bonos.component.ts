import { Component, OnInit } from '@angular/core';
import { BonoService } from 'src/app/services/http/bono.service';
import { FxGlobalsService, PdfGeneratorService } from 'src/app/services/services.index';

@Component({
  selector: 'app-informe-bonos',
  templateUrl: './informe-bonos.component.html',
  styleUrls: ['./informe-bonos.component.css']
})
export class InformeBonosComponent implements OnInit {

  constructor(
    private _bonos:   BonoService, 
    private _fx:      FxGlobalsService,
    private _pdf:     PdfGeneratorService) { }

  ngOnInit() {
  }

  public buscarBonos(event) {

    this._bonos.getBetweenDate(event.fechaDesde, event.fechaHasta).subscribe(
      data => this._pdf.generarInformeBonos(data.data, event),
      err =>  this._fx.showAlert("Error", "No se encontraron bonos en el rango ingresado", "err")
    )
  }

}
