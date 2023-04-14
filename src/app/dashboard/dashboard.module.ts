import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListEquipmentComponent } from './list-equipment/list-equipment.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ListEquipmentComponent,
    EquipmentFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ], 
  providers: [DatePipe],
})
export class DashboardModule { }
