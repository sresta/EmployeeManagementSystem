import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { ShowDepartmentComponent } from './show-department/show-department.component';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    ShowDepartmentComponent,
    AddEditDepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule
  ]
})
export class DepartmentModule { }
