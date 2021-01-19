import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentePruebaComponent } from './componentes/componente-prueba/componente-prueba.component';


const routes: Routes = [
  {
    path: '',
    component: ComponentePruebaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimerModuloRoutingModule { }
