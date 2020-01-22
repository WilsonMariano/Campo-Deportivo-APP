import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        NopagefoundComponent,
        NavbarComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    exports: [
        NopagefoundComponent,
        NavbarComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]
})
export class SharedModule { }
