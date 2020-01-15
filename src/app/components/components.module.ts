import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner/spinner.component';
import { GrillaComponent } from './grilla/grilla.component';
import { BuscarSocioComponent } from './buscar-socio/buscar-socio.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        SpinnerComponent,
        GrillaComponent,
        BuscarSocioComponent
    ],
    exports: [
        SpinnerComponent,
        GrillaComponent,
        BuscarSocioComponent
    ]
})
export class ComponentsModule { }