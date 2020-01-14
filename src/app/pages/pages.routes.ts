import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../services/services.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GrillaSociosComponent } from './grilla-socios/grilla-socios.component';
import { FichaComponent } from './ficha/ficha.component';
import { DatosSocioComponent } from './datos-socio/datos-socio.component';
import { BonosMenuComponent } from './bonos-menu/bonos-menu.component';
import { EmitirBonoComponent } from './emitir-bono/emitir-bono.component';
import { VistaPreviaCarnetComponent } from './vista-previa-carnet/vista-previa-carnet.component';
import { CarnetMenuComponent } from './carnet-menu/carnet-menu.component';
import { PagosComponent } from './pagos/pagos.component';
import { NuevoPagoComponent } from './nuevo-pago/nuevo-pago.component';

const pagesRoutes: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        children: [
            { path: 'dashboard',                    component: DashboardComponent,                      data: { titulo: 'Dashboard' }     },
            { path: 'grilla-socios',                component: GrillaSociosComponent,                   data: { titulo: 'Socios' }        },
            { path: 'bonos-menu',                   component: BonosMenuComponent,                      data: { titulo: 'Bonos' }        },
            { path: 'carnet-menu',                  component: CarnetMenuComponent,                     data: { titulo: 'Carnet' }         },
            { path: 'emitir-bono/:id',              component: EmitirBonoComponent,                     data: { titulo: 'Emitir bono' }        },
            { path: 'emitir-carnet/:id',            component: VistaPreviaCarnetComponent,              data: { titulo: 'Emitir carnet' }        },
            { path: 'datos-socio/:id',              component: DatosSocioComponent,                     data: { titulo: 'Datos socio' }   },
            { path: 'pagos/:id',                    component: PagosComponent,                          data: { titulo: 'Listado pagos' }   },
            { path: 'nuevo-pago/:id',               component: NuevoPagoComponent,                      data: { titulo: 'Nuevo pago' }   },
            { path: 'ficha/:id',                    component: FichaComponent,                          data: { titulo: 'Ficha' }         },
            { path: '',                             redirectTo: '/dashboard',                           pathMatch: 'full' }
        ],
        canActivate: [AuthGuard]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );