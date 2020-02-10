import { Component, OnInit } from '@angular/core';
import { DiccionarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-grilla-socios',
  templateUrl: './grilla-socios.component.html',
  styles: []
})
export class GrillaSociosComponent implements OnInit {

  public tipoParentesco = "";
  public arrParentesco = [];

  private arrControls = ['ID', 'Apellido', 'Nombre', 'Dni', 'Tipo Socio'];

  private arrAttr = [
    { 'attr': 'id',             'type': 'Number'  },
    { 'attr': 'apellido',       'type': 'String'  },
    { 'attr': 'nombre',         'type': 'String'  },
    { 'attr': 'dni',            'type': 'Number'  },
    { 'attr': 'tipoAfiliado',   'type': 'String'  }
  ];

  private filterParams = {
    'col': 'codParentesco',
    'txt': ''
  }

  public options = {
    'entity': 'vwSocios',
    'arrAttr': this.arrAttr,
    'arrControls': this.arrControls,
    'filterParams': this.filterParams,
    'buttons': [
      { 
        'url': 'campoDeportivoAdmin/home/ficha', 
        'icon': 'fa fa-id-card', 
        'idField': 'idSocioTitular'
      }
    ]
  }

  constructor(private _diccionario: DiccionarioService) { }

  ngOnInit() {

    this.getParentescos();
  }


  private getParentescos(): void {

    this._diccionario.getWithKeys('cod_parentesco').subscribe(
      data => this.arrParentesco = data.data
    );
  }

}
