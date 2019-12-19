import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../services/services.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GrillaSociosComponent } from './grilla-socios/grilla-socios.component';

const pagesRoutes: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        children: [
            { path: 'dashboard',                    component: DashboardComponent,                      data: { titulo: 'Dashboard' }        },
            { path: 'grilla-socios',                component: GrillaSociosComponent,                      data: { titulo: 'Dashboard' }        },
            { path: '',                             redirectTo: '/dashboard',                           pathMatch: 'full' }
        ],
        canActivate: [AuthGuard]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );