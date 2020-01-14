import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CuotaService, FxGlobalsService, PdfGeneratorService } from 'src/app/services/services.index';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styles: []
})
export class PagosComponent implements OnInit {

  public arrCuotas = [];
  public idSocioTitular: Number;

  constructor(private router: Router, private _cuota: CuotaService, private activatedRoute: ActivatedRoute, public _fx: FxGlobalsService, public _pdf: PdfGeneratorService) { }


  ngOnInit() {

    this.getCuotas();
  }

  private getCuotas(): void {

    this.activatedRoute.params.subscribe(
      params => {
        
        this.idSocioTitular = params.id;
        this._cuota.getCoutas(params.id).subscribe(
          data => {
            console.log(data);
            this.arrCuotas = data.data;
          },
          err => {
            this._fx.showAlert("Error", "El socio no existe", "error");
            this.router.navigate(['home/menu-pagos']);
          }
        )
      }
    );


  }

}
