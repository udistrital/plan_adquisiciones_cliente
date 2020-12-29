import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { TablaFichaTecnicaComponent } from './components/tabla-ficha-tecnica/tabla-ficha-tecnica.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'prueba_ficha',
    component: TablaFichaTecnicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroPlanAdquisicionesRoutingModule { }
