import { Component, OnInit, Inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, FxGlobalsService, PdfGeneratorService, FuncionalidadesService } from 'src/app/services/services.index';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-vista-previa-carnet',
  templateUrl: './vista-previa-carnet.component.html',
  styles: []
})
export class VistaPreviaCarnetComponent implements OnInit {

  public socio = null;
  public qrCode: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private _common: CommonService, 
    private _fx: FxGlobalsService, 
    private _pdf: PdfGeneratorService,
    private _funcionalidad: FuncionalidadesService,
    private router: Router) { 

    }

  ngOnInit() {

    this.getParams();
  }

  /**
   * Recibo los parametros de la url
   * Si se recibe un id de socio se invoca el metodo para recuperar el socio
   */
  private getParams(): void {

    this.activatedRoute.params.subscribe(
      params => {
        if(params.id != 'nuevo')
          this.getSocio(params.id);
      }
    );
  }

  /**
   * Recibe el id de un socio y lo trae
   * Una vez que recibe los datos renderiza el qr
   * @param id id del socio a buscar
   */
  private getSocio(id): void {

    this._common.getOne('vwSocios', id).subscribe(

      data => { 
     
        this._funcionalidad.getFuncionalidad(data.codTipoSocio, 'cod_funcionalidad_3').subscribe(

          // Valido la funcionalidad
          res => {
            if(res.data.habilitado == 0) {
              this._fx.showAlert("Error", "El tipo de socio no puede generar carnet", "error");
              
            } else {

              this.socio = data; 
              this.renderQR();
            }
          }
        )
      },
      err => {
        this._fx.showAlert("Error", "El socio no existe", "error");
        this.socio = null;
      }
    );
  }

  /**
   * Usa un timeOut para que se renderice el DOM con el div del qr
   * ya que este tiene un ngIf y recien se muestra una vez ejecutado el metodo getSocio
   */
  private renderQR(): void {
    
    setTimeout(() => {

      let div = document.getElementById("qrcode");
      div.innerHTML = "";
      this.qrCode = this._fx.generateQR(div, this.socio.hash);

    }, 500);
  }

  /**
   * Recupera la imagen del qr y llama al metodo para generar el pdf
   */
  public makePDF() {

    console.log(this.qrCode);

    let img = this.qrCode._el.children[1].currentSrc;
    this._pdf.generarCarnet(this.socio, img)
  }

}
