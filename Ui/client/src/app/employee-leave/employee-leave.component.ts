import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../shared/service/leave.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../global/global';
import { LeaveStatus } from '../shared/enums/enum';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  employeeLeaves: any[] = [];
  status = [
    { key: 'Pending', value: 'pending' },
    { key: 'Approved', value: 'approved' },
  ];
  userRole = '';
  leaveStatus: any = LeaveStatus;

  constructor(
    private leaveService: LeaveService,
    private global: Globals
  ) { }

  ngOnInit(): void {
    this.userRole = this.global.role;
    this.fetch();
  }

  fetch() {
    if (this.userRole === "Admin") {
      this.leaveService.list()
        .pipe()
        .subscribe(res => {
          this.employeeLeaves = res;
        });

    } else {
      this.leaveService.getEmployeeLeave(this.global.id)
        .pipe()
        .subscribe(res => {
          this.employeeLeaves = res;
        });
    }
  }

  updateLeave(leave: any) {
    this.leaveService.update(leave.id, leave).pipe().subscribe();
  }

}
