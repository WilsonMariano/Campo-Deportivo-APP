// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module'

// Rutas
import { APP_ROUTES } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Clases
import { HttpErrorInterceptor } from './class/class.index';

// Componentes
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';

// Servicios
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTES,
    PagesModule,
    ComponentsModule,
    ServiceModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    ServiceModule,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
