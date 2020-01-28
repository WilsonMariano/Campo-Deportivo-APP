import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../services/services.index';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GrillaSociosComponent } from './grilla-socios/grilla-socios.component';
import { FichaComponent } from './ficha/ficha.component';
import { DatosSocioComponent } from './datos-socio/datos-socio.component';
import { EmitirBonoComponent } from './emitir-bono/emitir-bono.component';
import { VistaPreviaCarnetComponent } from './vista-previa-carnet/vista-previa-carnet.component';
import { PagosComponent } from './pagos/pagos.component';
import { NuevoPagoComponent } from './nuevo-pago/nuevo-pago.component';
import { ListarBonosComponent } from './listar-bonos/listar-bonos.component';
import { ListarBonosAsignacionComponent } from './listar-bonos-asignacion/listar-bonos-asignacion.component';
import { InformeBonosComponent } from './informe-bonos/informe-bonos.component';
import { InformeCuotasComponent } from './informe-cuotas/informe-cuotas.component';

const pagesRoutes: Routes = [
    {
        path: 'home',
        component: PagesComponent,
        children: [
            { path: 'dashboard',                                component: DashboardComponent,                      data: { titulo: 'Dashboard' }     },
            { path: 'grilla-socios',                            component: GrillaSociosComponent,                   data: { titulo: 'Socios' }        },
            { path: 'emitir-bono/:id',                          component: EmitirBonoComponent,                     data: { titulo: 'Emitir bono' }        },
            { path: 'listar-bonos-fecha',                       component: ListarBonosComponent,                    data: { titulo: 'Listar bonos' }        },
            { path: 'listar-bonos-asignacion',                  component: ListarBonosAsignacionComponent,          data: { titulo: 'Listar bonos' }        },
            { path: 'informe-bonos',                            component: InformeBonosComponent,                   data: { titulo: 'Informe de bonos emitidos' }        },
            { path: 'informe-cuotas',                           component: InformeCuotasComponent,                  data: { titulo: 'Informe de cuotas cobradas' }        },
            { path: 'vista-previa-carnet/:id',                  component: VistaPreviaCarnetComponent,              data: { titulo: 'Emitir carnet' }        },
            { path: 'datos-socio/:operacion/:entidad/:id',      component: DatosSocioComponent,                     data: { titulo: 'Datos socio' }   },
            { path: 'datos-socio/:id',                          component: DatosSocioComponent,                     data: { titulo: 'Datos socio' }   },
            { path: 'pagos/:id',                                component: PagosComponent,                          data: { titulo: 'Listado de recibos' }   },
            { path: 'nuevo-pago/:id',                           component: NuevoPagoComponent,                      data: { titulo: 'Nuevo pago' }   },
            { path: 'ficha/:id',                                component: FichaComponent,                          data: { titulo: 'Ficha' }         },
            { path: '',                                         redirectTo: '/dashboard',                           pathMatch: 'full' }
        ],
        canActivate: [AuthGuard]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );