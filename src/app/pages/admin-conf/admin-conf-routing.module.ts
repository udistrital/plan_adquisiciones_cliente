import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanesAdqActivosComponent } from './planes-adq-activos/planes-adq-activos.component';


const routes: Routes = [
  {
    path: '',
    component: PlanesAdqActivosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminConfRoutingModule { }
