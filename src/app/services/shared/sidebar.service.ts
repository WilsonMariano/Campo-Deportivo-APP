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
      url:    '/home/carnet-menu',
      icono: 'fa fa-address-card'
    },
    {
      titulo: 'Bonos',
      url:    '/home/bonos-menu',
      icono: 'fa fa-ticket'
    },
    {
      titulo: 'Cuotas',
      url:    '/home/pagos/nuevo',
      icono: 'fa fa-money-bill-wave'
    }
  ];

  constructor() { }
}
