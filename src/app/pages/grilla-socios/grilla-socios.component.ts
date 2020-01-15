import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grilla-socios',
  templateUrl: './grilla-socios.component.html',
  styles: []
})
export class GrillaSociosComponent implements OnInit {

  public tipoParentesco = "titular";

  private arrControls = ['NroSocio', 'Apellido', 'Nombre', 'Dni', 'Tipo Socio'];


  private arrAttr = [
    { 'attr': 'id',             'type': 'Number'  },
    { 'attr': 'apellido',       'type': 'String'  },
    { 'attr': 'nombre',         'type': 'String'  },
    { 'attr': 'dni',            'type': 'Number'  },
    { 'attr': 'tipoAfiliado',   'type': 'String'  }
  ];

  private filterParams = {
    'col': 'parentesco',
    'txt': 'titular'
  }


  public options = {
    'entity': 'vwSocios',
    'arrAttr': this.arrAttr,
    'arrControls': this.arrControls,
    'filterParams': this.filterParams,
    'buttons': [
      { 
        'url': 'home/ficha', 
        'icon': 'fa fa-id-card', 
        'idField': 'idSocioTitular'
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

  public nuevoSocio() {

    localStorage.setItem('parentesco', 'titular');
  }

  public changeShowParams() {

    this.options.filterParams.txt = this.tipoParentesco;
  }

}
