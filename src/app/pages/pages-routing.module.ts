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
      path: 'plan-adquisiciones',
      loadChildren: () => import('./plan-adquisiciones/plan-adquisiciones.module')
      .then(m => m.PlanAdquisicionesModule),
    },
    {
      path: '',
      redirectTo: 'prueba',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'prueba',
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
