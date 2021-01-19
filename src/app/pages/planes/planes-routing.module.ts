import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearPlanAdquisicionComponent } from './components/crear-plan-adquisicion/crear-plan-adquisicion.component';
import { DetallePlanComponent } from './components/detalle-plan/detalle-plan.component';
import { DetalleVersionPlanComponent } from './components/detalle-version-plan/detalle-version-plan.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TablaPlanesAdquisicionesComponent } from './components/tabla-planes-adquisiciones/tabla-planes-adquisiciones.component';
import { TablaVersionesComponent } from './components/tabla-versiones/tabla-versiones.component';


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
        path: 'detalle-plan-adquisiciones',
        component: DetallePlanComponent,
      },
      {
        path: 'versiones-plan-adquisiciones',
        component: TablaVersionesComponent,
      },
      {
        path: 'detalle-version-plan-adquisiciones',
        component: DetalleVersionPlanComponent,
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
