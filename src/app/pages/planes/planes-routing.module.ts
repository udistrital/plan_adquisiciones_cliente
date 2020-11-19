import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearPlanAdquisicionComponent } from './components/crear-plan-adquisicion/crear-plan-adquisicion.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TablaPlanesAdquisicionesComponent } from './components/tabla-planes-adquisiciones/tabla-planes-adquisiciones.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tabla-general',
        component: TablaPlanesAdquisicionesComponent,
      },
      {
        path: 'crear-plan-adquisiciones',
        component: CrearPlanAdquisicionComponent,
      },
      {
        path: '',
        redirectTo: 'tabla-general',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'tabla-general',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesRoutingModule { }
