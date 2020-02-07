import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    // {
    //   titulo: 'Principal',
    //   url:    '/home/dashboard',
    //   icono: 'fa fa-columns'
    // },
    {
      titulo: 'Socios',
      icono: 'fa fa-users',
      submenu: [
        {
          titulo: 'Grilla socios',
          url:    '/home/grilla-socios'
        }
      ]
    },
    {
      titulo: 'Carnets',
      icono: 'fa fa-address-card',
      submenu: [
        {
          titulo: 'Imprimir carnet',
          url:    '/home/vista-previa-carnet/nuevo'
        }
      ]
    },
    {
      titulo: 'Bonos',
      icono: 'fa fa-ticket',
      submenu: [
        {
          titulo: 'Nuevo bono',
          url:    '/home/emitir-bono/nuevo'
        },
        {
          titulo: 'Calendario de prestaciones',
          url:    '/home/calendario'
        },
        {
          titulo: 'Listar por emisión',
          url:    '/home/listar-bonos-fecha'
        },
        {
          titulo: 'Listar por asignación',
          url:    '/home/listar-bonos-asignacion'
        }
      ]
    },
    {
      titulo: 'Recibos',
      icono: 'fa fa-file-invoice-dollar',
      submenu: [
        {
          titulo: 'Listar recibos',
          url:    '/home/pagos/nuevo'
        }
      ]
    },
    {
      titulo: 'Pagos',
      icono: 'fa fa-money-bill-wave',
      submenu: [
        {
          titulo: 'Nuevo pago',
          url:    '/home/nuevo-pago/nuevo'
        }
      ]
    },
    {
      titulo: 'Informes',
      icono: 'fas fa-clipboard-list',
      submenu: [
        {
          titulo: 'Informe de bonos',
          url:    '/home/informe-bonos'
        },
        {
          titulo: 'Informe de cuotas',
          url:    '/home/informe-cuotas'
        },
        {
          titulo: 'Informe de caja',
          url:    '/home/informe-ingresos-caja'
        },
        {
          titulo: 'Informe de ingresos',
          url:    '/home/informe-ingresos'
        }
      ]
    }
  ];

  constructor() { }
}
