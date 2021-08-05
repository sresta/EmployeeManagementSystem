import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EmployeeComponent,
    DisplayEmployeeComponent,
    AddEditEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  providers: [DatePipe]
})
export class EmployeeModule { }
