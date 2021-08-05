import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: 'create',
    data: {
      action: 'create'
    },
    component: AddEditEmployeeComponent
  },
   {
    path: 'edit/:id',
    data: {
      action: 'edit'
    },
    component: AddEditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
