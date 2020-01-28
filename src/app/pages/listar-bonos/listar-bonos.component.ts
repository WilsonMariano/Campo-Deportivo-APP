import { Component, OnInit } from '@angular/core';
import { BonoService } from 'src/app/services/http/bono.service';
import { FxGlobalsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-listar-bonos',
  templateUrl: './listar-bonos.component.html',
  styleUrls: ['listar-bonos.component.css']
})
export class ListarBonosComponent implements OnInit {

  private fechaDesde;
  private fechaHasta;
  public arrBonos = [];
  public bonoPrevia = null;

  constructor(private _bonos: BonoService, private _fx: FxGlobalsService) { }

  ngOnInit() { }

  public inputData(event): void {

    this.fechaDesde = event.fechaDesde;
    this.fechaHasta = event.fechaHasta;

    this.getBonos();
  }

  private getBonos() {

    this._bonos.getBetweenDate(this.fechaDesde, this.fechaHasta).subscribe(
      data => this.arrBonos = data.data
    );
  }

  public anular(id): void {

   this._fx.showQuestionAlert("Confirmación", "¿Está seguro de anular el bono?", "warning").then(

    () => this._bonos.cancel(id).subscribe(
        () => {
          this._fx.showAlert("Perfecto",  "El bono se ha anulado", "success");
          this.getBonos();
        }
    )
   );
  }
}
