import { Component, OnInit, Input } from '@angular/core';
import { FxGlobalsService } from 'src/app/services/services.index';
declare var moment: any;

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {
  @Input() datos = null;

  constructor(private _fx: FxGlobalsService) { }

  ngOnInit() {
  
    // this.calculateDiffDates();
  }

  public estaVencido() {

    let hoy = moment().format('YYYY-MM-DD');
    let dias = moment(this.datos.vencimiento).diff(hoy, "days");

    return dias < 0;
  }

}
