import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocioService } from '../../services/services.index';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  private newOperation: Boolean;
  public arrSocios: any[];

  constructor(private activateRoute: ActivatedRoute, private _socio: SocioService) { }

  ngOnInit() {

    //Recibo ID
    this.activateRoute.params.subscribe(
      data => {
        if(data['id'] !== 'nuevo') {
          
          this.getSocios( data['id'] );
          this.newOperation = false;

        }
      });
  }

  private getSocios(id: Number) {

    this._socio.getGroupFamily(id).subscribe(
      
      data => {
        this.arrSocios = data.data;
        console.log(data.data);
      }
    )
    
  }

}
