import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    {
      titulo: 'Principal',
      url:    '/home/dashboard',
      icono: 'fa fa-columns'
    },
    {
      titulo: 'Socios',
      url:    '/home/grilla-socios',
      icono: 'fa fa-users'
    },
    {
      titulo: 'Carnets',
      url:    '/home/vista-previa-carnet/nuevo',
      icono: 'fa fa-address-card'
    },
    {
      titulo: 'Bonos',
      url:    '/home/bonos-menu',
      icono: 'fa fa-ticket'
    },
    {
      titulo: 'Recibos',
      url:    '/home/pagos/nuevo',
      icono: 'fa fa-file-invoice-dollar'
    },
    {
      titulo: 'Nuevo Pago',
      url:    '/home/nuevo-pago/nuevo',
      icono: 'fa fa-money-bill-wave'
    }
  ];

  constructor() { }
}
