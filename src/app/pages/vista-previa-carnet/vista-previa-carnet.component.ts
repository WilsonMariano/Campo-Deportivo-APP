import { Component, OnInit, Inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, FxGlobalsService, PdfGeneratorService } from 'src/app/services/services.index';

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
    private router: Router) { 

    }

  ngOnInit() {

    this.getSocio();

  }

  private getSocio(): void {

    this.activatedRoute.params.subscribe(
      params => {

        this._common.getOne('vwSocios', params.id).subscribe(

          data => { 
            this.socio = data; 
            console.log(data);
            this.qrCode = this._fx.generateQR(document.getElementById("qrcode"), this.socio.hash);
          },
          err => {
            this._fx.showAlert("Error", "El socio no existe", "error");
            this.router.navigate(['home/carnet-menu']);
            
          }
        )
      }
    )
  }

  public makePDF() {

    console.log(this.qrCode);

    let img = this.qrCode._el.children[1].currentSrc;
    this._pdf.generarCarnet(this.socio, img)
  }

}
