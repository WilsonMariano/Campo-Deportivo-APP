import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService, FxGlobalsService, FuncionalidadesService } from '../../services/services.index';
import { Socio } from '../../class/class.index';
declare var $: any;

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  public datosSocio = null;
  public socioTitular: Socio = null;
  public arrFamiliares: Socio[] = [];

  public canAddFamily = false;
  public canPay = false;
  public canEmitCarnet = false;


  constructor(
    private activateRoute: ActivatedRoute, 
    private router: Router, 
    private _socio: SocioService,
    private _fx: FxGlobalsService,
    private _funcionalidades: FuncionalidadesService) { }

  ngOnInit() {

    //Recibo ID
    this.activateRoute.params.subscribe(

      data => this.getSocios(data['id'])
    );
  }

  private getSocios(id: Number): void {

    this._socio.getGroupFamily(id, 'cod_parentesco_1').subscribe(
      data => {

        this.socioTitular = data.data[0];
        this.getFuncionalidades(data.data[0].codTipoSocio);
      }
    );

    this._socio.getGroupFamily(id, 'cod_parentesco_2').subscribe(
      data => this.arrFamiliares = data.data 
    );
  }

  public registrarIngreso(hash: String) {

    this._socio.register('hash', hash).subscribe(
      data => {

        console.log(data);
        
        if(!data.ok)
          this._fx.showAlert('Error', data.msg, "error");
        
        else {

          this.datosSocio = data.data;
          $('#modalRegister2').modal('show');
        }
      },
      err => this._fx.showAlert('Error', err.msg, "error")
    );
  }

  public getFuncionalidades(codTipoSocio: String): void {

    this._funcionalidades.getFuncionalidad(codTipoSocio, 'cod_funcionalidad_1').subscribe(
      data => {
        console.log(data);
        if(data.data.habilitado == 1) 
          this.canAddFamily = true;
      }
    )

    this._funcionalidades.getFuncionalidad(codTipoSocio, 'cod_funcionalidad_2').subscribe(
      data => {
        console.log(data);
        if(data.data.habilitado == 1) 
          this.canPay = true;
      }
    )

    this._funcionalidades.getFuncionalidad(codTipoSocio, 'cod_funcionalidad_3').subscribe(
      data => {
        console.log(data);
        if(data.data.habilitado == 1) 
          this.canEmitCarnet = true;
      }
    )


  }

  
}
