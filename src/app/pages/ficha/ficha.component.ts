import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService, FxGlobalsService } from '../../services/services.index';
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
  public arrInvitados: Socio[] = [];


  constructor(
    private activateRoute: ActivatedRoute, 
    private router: Router, 
    private _socio: SocioService,
    private _fx: FxGlobalsService) { }

  ngOnInit() {

    //Recibo ID
    this.activateRoute.params.subscribe(

      data => this.getSocios(data['id'])
    );
  }

  private getSocios(id: Number): void {

    this._socio.getGroupFamily(id, 'cod_parentesco_1').subscribe(
      data => this.socioTitular = data.data[0]
    );

    this._socio.getGroupFamily(id, 'cod_parentesco_2').subscribe(
      data => this.arrFamiliares = data.data 
    );

    this._socio.getGroupFamily(id, 'cod_parentesco_3').subscribe(
      data => this.arrInvitados = data.data
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
  
}
