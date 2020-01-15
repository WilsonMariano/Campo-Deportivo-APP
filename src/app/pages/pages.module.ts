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
import { BonosMenuComponent } from './bonos-menu/bonos-menu.component';
import { EmitirBonoComponent } from './emitir-bono/emitir-bono.component';
import { VistaPreviaBonoComponent } from '../components/vista-previa-bono/vista-previa-bono.component';
import { VistaPreviaCarnetComponent } from './vista-previa-carnet/vista-previa-carnet.component';
import { PagosComponent } from './pagos/pagos.component';
import { NuevoPagoComponent } from './nuevo-pago/nuevo-pago.component';

@NgModule({
    declarations: [
        DashboardComponent,
        GrillaSociosComponent,
        FichaComponent,
        DatosSocioComponent,
        BonosMenuComponent,
        EmitirBonoComponent,
        VistaPreviaBonoComponent,
        VistaPreviaCarnetComponent,
        PagosComponent,
        NuevoPagoComponent
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