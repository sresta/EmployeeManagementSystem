import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'src/app/global/global';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  EmployeeList: any = [];

  ModalTitle = '';
  ActivateAddEditEmpComp: boolean = false;
  employeeId = '';
  constructor(private service: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    public global: Globals) { }

  ngOnInit(): void {
    this.fetch();
  }

  addEmployee() {
    void this.router.navigateByUrl('/employee/create');
  }

  editEmployee(item: any) {
    this.employeeId = item.id;
    void this.router.navigateByUrl(`/employee/edit/${this.employeeId}`);
  }

  deleteClick(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.service.delete(item.id)
        .subscribe(data => {
          this.toastr.success("Employee deleted successfully")
          this.fetch();
        })
    })
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.fetch();
  }


  fetch() {
    this.service.list()
      .pipe()
      .subscribe(data => {
        this.EmployeeList = data;
      });
  }
}
