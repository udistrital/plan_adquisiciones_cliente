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
    // {
    //   path: 'actividades',
    //   loadChildren: () => import('../lineamientos/lineamientos.module')
    //   .then(m => m.LineamientosModule),
    // },
    {
      path: '',
      redirectTo: 'lineamientos',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'lineamientos',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanAdquisicionesRoutingModule { }