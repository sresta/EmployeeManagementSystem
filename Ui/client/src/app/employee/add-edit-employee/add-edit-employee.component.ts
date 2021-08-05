import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { DepartmentService } from 'src/app/shared/service/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employee: any;
  EmployeeId = '';
  EmployeeName = '';
  Department = '';
  DateOfJoining = '';
  PhotoFileName = '';
  PhotoFilePath = '';

  departments: any = [];
  action = "";
  employeeId = '';
  employeeForm: FormGroup;
  title = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.createEmployeeForm();
    this.loadDepartmentList();
    this.activatedRoute.data.subscribe(data => {
      if (data.action) {
        this.action = data.action;
        this.title = this.action === 'create' ? 'Create' : 'Update';
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.employeeId = params.id;
      if (this.employeeId) {
        this.employeeService.get(this.employeeId)
          .pipe()
          .subscribe(res => {
            this.employee = res;
            this.initializeForm();
          });
      }
    });

  }

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', Validators.required],
      DepartmentId: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      Address: ['', Validators.required]
    });
  }

  initializeForm() {
    this.employeeForm.setValue({
      UserName: this.employee.userName,
      Email: this.employee.email,
      DepartmentId: this.employee.departmentId,
      DateOfJoining: this.datePipe.transform(this.employee.dateOfJoining, 'yyyy-MM-dd'),
      Address: this.employee.address
    });
  }

  loadDepartmentList() {
    this.departmentService.list().subscribe((data: any) => {
      this.departments = data;
    });
  }

  addEmployee() {
    const value = this.employeeForm.value;

    this.employeeService.create(value)
      .pipe()
      .subscribe(res => {
        this.toastr.success("Employee successfully created");
        void this.router.navigate(['/employee']);
      },
        () => {
          this.toastr.error("Cannot create Employee.");
        });
  }

  updateEmployee() {
    const value = this.employeeForm.value;

    this.employeeService.update(this.employeeId, value)
      .pipe()
      .subscribe(res => {
        this.toastr.success("Employee successfully updated");
        void this.router.navigate(['/employee'])
      },
        () => {
          this.toastr.error("Cannot update Employee.");
        });
  }
}
