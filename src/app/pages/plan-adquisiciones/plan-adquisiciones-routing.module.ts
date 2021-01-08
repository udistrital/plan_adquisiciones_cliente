import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'lineamientos',
      loadChildren: () => import('../lineamientos/lineamientos.module')
      .then(m => m.LineamientosModule),
    },
    {
      path: 'metas',
      loadChildren: () => import('../metas/metas.module')
      .then(m => m.MetasModule),
    },
    {
      path: 'actividades',
      loadChildren: () => import('../actividades/actividades.module')
      .then(m => m.ActividadesModule),
    },
    {
      path: 'planes',
      loadChildren: () => import('../planes/planes.module')
      .then(m => m.PlanesModule),
    },
    {
      path: 'registro-plan-adquisiciones',
      loadChildren: () => import('../registro-plan-adquisiciones/registro-plan-adquisiciones.module')
      .then(m => m.RegistroPlanAdquisicionesModule),
    },
    {
      path: '',
      redirectTo: 'planes',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'planes',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAdquisicionesRoutingModule { }
