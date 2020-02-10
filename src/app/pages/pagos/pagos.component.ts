import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CuotaService, FxGlobalsService, PdfGeneratorService, FuncionalidadesService } from 'src/app/services/services.index';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styles: []
})
export class PagosComponent implements OnInit {

  public arrCuotas = [];
  public idSocio: Number;

  constructor(
    private router: Router, 
    private _cuota: CuotaService, 
    private activatedRoute: ActivatedRoute, 
    public _fx: FxGlobalsService, 
    public _pdf: PdfGeneratorService,
    private _funcionalidades: FuncionalidadesService) { }


  ngOnInit() {

    this.getParams();
  }

   /**
   * Recibo los parametros de la url
   * Si se recibe un id de socio se invoca el metodo para recuperar las cuotas
   */
  private getParams(): void {

    this.activatedRoute.params.subscribe(
      params => {
        if(params.id != 'nuevo')  {
        
          this.getCuotas(params.id);
        }
      }
    );
  }

  /**
   * Obtiene todas las cuotas de pago vinculadas al socio
   * @param idSocio id del socio para el cual traer las cuotas
   */
  public getCuotas(idSocio): void {

    this.idSocio = idSocio;
    
    this._cuota.getCoutas(idSocio).subscribe(
      data => {
        console.log(data);
        // this.validateFuncionalidad(data.data.codTipoSocio);
        this.arrCuotas = data.data;
      },
      err => {
        this._fx.showAlert("Error", "No existen recibos generados", "error");
        // this.router.navigate(['home/menu-pagos']);
      }
    );
  }


}
