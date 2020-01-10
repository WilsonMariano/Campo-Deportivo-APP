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
      titulo: 'Bonos',
      url:    '/home/bonos-menu',
      icono: 'fa fa-ticket'
    }
  ];

  constructor() { }
}
