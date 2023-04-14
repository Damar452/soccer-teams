import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEquipmentComponent } from './list-equipment/list-equipment.component';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'equipment-list',
        component: ListEquipmentComponent
      },
      {
        path: 'equipment-register',
        component: EquipmentFormComponent,
        canActivate:[AuthGuard],
      },
      {
        path: 'equipment-edit/:id',
        component: EquipmentFormComponent,
        canActivate:[AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
