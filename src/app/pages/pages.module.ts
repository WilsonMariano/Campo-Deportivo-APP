import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module'


import { GrillaSociosComponent } from './grilla-socios/grilla-socios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FichaComponent } from './ficha/ficha.component';
import { DatosSocioComponent } from './datos-socio/datos-socio.component';

@NgModule({
    declarations: [
        DashboardComponent,
        GrillaSociosComponent,
        FichaComponent,
        DatosSocioComponent
    ],
    exports: [
    ],  
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PAGES_ROUTES,
        SharedModule,
        ComponentsModule
    ],
    providers: []
})
export class PagesModule { }