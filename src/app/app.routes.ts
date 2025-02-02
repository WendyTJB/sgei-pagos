import { Routes } from '@angular/router';
import { SgeiPagosAccessDeniedComponent } from './sgei-pagos-access-denied/sgei-pagos-access-denied.component';
import { SgeiPagosFormComponent } from './sgei-pagos-form/sgei-pagos-form.component';
import { SgeiPagosHomeComponent } from './sgei-pagos-home/sgei-pagos-home.component';
import { SgeiPagosNotFoundComponent } from './sgei-pagos-not-found/sgei-pagos-not-found.component';
import { SgeiPagosStatusComponent } from './sgei-pagos-status/sgei-pagos-status.component';

export const routes: Routes = [
  { path: '', component:SgeiPagosHomeComponent },
  { path: 'pagos', component: SgeiPagosFormComponent },
  { path: 'pagoEstado', component: SgeiPagosStatusComponent },
  { path: 'pagoAccesoDenegado', component: SgeiPagosAccessDeniedComponent },
  { path: '**', component:SgeiPagosNotFoundComponent }
];
