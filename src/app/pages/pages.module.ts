import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module'


import { GrillaSociosComponent } from './grilla-socios/grilla-socios.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent,
        GrillaSociosComponent
    ],
    exports: [
    ],  
    imports: [
        CommonModule,
        PAGES_ROUTES,
        SharedModule,
        ComponentsModule
    ],
    providers: []
})
export class PagesModule { }