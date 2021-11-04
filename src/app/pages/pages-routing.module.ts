import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'prueba',
      loadChildren: () => import('./primer-modulo/primer-modulo.module')
      .then(m => m.PrimerModuloModule),
    },
    {
      path: 'admin-conf',
      loadChildren: () => import('./admin-conf/admin-conf.module')
      .then(m => m.AdminConfModule),
    },
    {
      path: 'plan-adquisiciones',
      loadChildren: () => import('./plan-adquisiciones/plan-adquisiciones.module')
      .then(m => m.PlanAdquisicionesModule),
    },
    {
      path: '',
      redirectTo: 'plan-adquisiciones',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'plan-adquisiciones',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
