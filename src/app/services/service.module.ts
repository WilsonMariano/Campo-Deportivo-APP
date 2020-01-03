import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';

import { 
  SidebarService, 
  UsuarioService, 
  FxGlobalsService, 
  AuthService,
  CommonService,
  ValoresService
} from './services.index';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      AuthModule
    ],
    providers: [ 
      SidebarService,
      UsuarioService,
      FxGlobalsService,
      AuthService,
      CommonService,
      ValoresService
    ]
  })
  export class ServiceModule { }