import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { LeaveService } from '../shared/service/leave.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../global/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('closeButton', { static: false }) closeBtn: ElementRef;
  datePickerConfig = {
    minDate: moment()
  };
  leaveForm: FormGroup;
  user: any;

  constructor(private leaveService: LeaveService,
    private formBuilder: FormBuilder, public global: Globals,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.user = this.global;
    this.leaveForm = this.formBuilder.group({
      UserId: [this.global.id],
      FromDate: [''],
      ToDate: [''],
      Reason: [''],
      NumberOfDays: [''],
      Status: ['pending']
    });
  }

  dateEvent(event: any) {

  }

  applyLeave() {
    this.leaveForm.get('NumberOfDays').setValue(this.calculateDays(this.leaveForm.value));
    const value = this.leaveForm.value;
    this.leaveService.create(value)
      .pipe()
      .subscribe(res => {
        this.toastr.success("Leave successfully applied");
        this.closeBtn.nativeElement.click();
      },
        (err) => {
          this.toastr.error('Cannot apply for leave');
        });
  }

  calculateDays(value: any) {
    var startDate = moment(value.FromDate, 'YYYY-MM-DD');
    var endDate = moment(value.ToDate, 'YYYY-MM-DD');
    var days = endDate.diff(startDate, 'days');
    return days;
  }

}
