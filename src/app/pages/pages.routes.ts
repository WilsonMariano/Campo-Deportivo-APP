import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../services/services.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GrillaSociosComponent } from './grilla-socios/grilla-socios.component';
import { FichaComponent } from './ficha/ficha.component';
import { DatosSocioComponent } from './datos-socio/datos-socio.component';
import { BonosComponent } from './bonos/bonos.component';
import { EmitirBonoComponent } from './emitir-bono/emitir-bono.component';

const pagesRoutes: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        children: [
            { path: 'dashboard',                    component: DashboardComponent,                      data: { titulo: 'Dashboard' }     },
            { path: 'grilla-socios',                component: GrillaSociosComponent,                   data: { titulo: 'Socios' }        },
            { path: 'bonos',                        component: BonosComponent,                          data: { titulo: 'Bonos' }        },
            { path: 'emitir-bono/:id',              component: EmitirBonoComponent,                     data: { titulo: 'Emitir bono' }        },
            { path: 'datos-socio/:id',              component: DatosSocioComponent,                     data: { titulo: 'Datos socio' }   },
            { path: 'ficha/:id',                    component: FichaComponent,                          data: { titulo: 'Ficha' }         },
            { path: '',                             redirectTo: '/dashboard',                           pathMatch: 'full' }
        ],
        canActivate: [AuthGuard]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );