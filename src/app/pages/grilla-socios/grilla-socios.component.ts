import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grilla-socios',
  templateUrl: './grilla-socios.component.html',
  styles: []
})
export class GrillaSociosComponent implements OnInit {

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
    'txt': 'Titular'
  }


  public options = {
    'entity': 'vwSocios',
    'arrAttr': this.arrAttr,
    'arrControls': this.arrControls,
    'filterParams': this.filterParams
  }

  constructor() { }

  ngOnInit() {
  }

}
