import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminConfRoutingModule } from './admin-conf-routing.module';
import { PlanesAdqActivosComponent } from './planes-adq-activos/planes-adq-activos.component';


@NgModule({
  declarations: [PlanesAdqActivosComponent],
  imports: [
    CommonModule,
    AdminConfRoutingModule
  ]
})
export class AdminConfModule { }
