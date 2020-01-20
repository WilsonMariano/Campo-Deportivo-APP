import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocioService } from '../../services/services.index';
import { Socio } from '../../class/class.index';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  private idSocioTitular: Number;
  public socioTitular: Socio = null;
  public arrFamiliares: Socio[] = [];
  public arrInvitados: Socio[] = [];


  constructor(private activateRoute: ActivatedRoute, private router: Router, private _socio: SocioService) { }

  ngOnInit() {

    //Recibo ID
    this.activateRoute.params.subscribe(
      data => {
       
          
          this.idSocioTitular = data['id'];
          this.getSocios();

        
      });
  }

  private getSocios(): void {

    this._socio.getGroupFamily(this.idSocioTitular, 'cod_parentesco_1').subscribe(
      
      data => {
        this.socioTitular = data.data[0];
      }
    ) 

    this._socio.getGroupFamily(this.idSocioTitular, 'cod_parentesco_2').subscribe(
      
      data => {
        this.arrFamiliares = data.data;
      }
    ) 

    this._socio.getGroupFamily(this.idSocioTitular, 'cod_parentesco_3').subscribe(
      
      data => {
        this.arrInvitados = data.data;
      }
    ) 
  }
  
  private establecerFamiliar(): void {

    localStorage.setItem('parentesco', 'familiar');
    localStorage.setItem('idSocioTitular', this.idSocioTitular.toString());

  }
}
