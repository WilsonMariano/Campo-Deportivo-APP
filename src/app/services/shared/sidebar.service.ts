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
          titulo: 'Listado de socios',
          url:    '/campoDeportivoAdmin/home/grilla-socios'
        }
      ]
    },
    {
      titulo: 'Carnets',
      icono: 'fa fa-address-card',
      submenu: [
        {
          titulo: 'Imprimir carnet',
          url:    '/campoDeportivoAdmin/home/vista-previa-carnet/nuevo'
        }
      ]
    },
    {
      titulo: 'Bonos',
      icono: 'fas fa-ticket-alt',
      submenu: [
        {
          titulo: 'Nuevo bono',
          url:    '/campoDeportivoAdmin/home/emitir-bono/nuevo'
        },
        {
          titulo: 'Calendario de prestaciones',
          url:    '/campoDeportivoAdmin/home/calendario'
        },
        {
          titulo: 'Listar por emisión',
          url:    '/campoDeportivoAdmin/home/listar-bonos-fecha'
        },
        {
          titulo: 'Listar por asignación',
          url:    '/campoDeportivoAdmin/home/listar-bonos-asignacion'
        }
      ]
    },
    {
      titulo: 'Recibos',
      icono: 'fa fa-file-invoice-dollar',
      submenu: [
        {
          titulo: 'Listar recibos',
          url:    '/campoDeportivoAdmin/home/pagos/nuevo'
        }
      ]
    },
    {
      titulo: 'Pagos',
      icono: 'fa fa-money-bill-wave',
      submenu: [
        {
          titulo: 'Nuevo pago',
          url:    '/campoDeportivoAdmin/home/nuevo-pago/nuevo'
        }
      ]
    },
    {
      titulo: 'Informes',
      icono: 'fas fa-clipboard-list',
      submenu: [
        {
          titulo: 'Informe de bonos',
          url:    '/campoDeportivoAdmin/home/informe-bonos'
        },
        {
          titulo: 'Informe de cuotas',
          url:    '/campoDeportivoAdmin/home/informe-cuotas'
        },
        {
          titulo: 'Informe de caja',
          url:    '/campoDeportivoAdmin/home/informe-ingresos-caja'
        },
        {
          titulo: 'Informe de ingresos',
          url:    '/campoDeportivoAdmin/home/informe-ingresos'
        }
      ]
    }
  ];

  constructor() { }
}
