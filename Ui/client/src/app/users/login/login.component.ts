import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLoginModel = {
    Email: '',
    Password: ''
  }

  constructor(private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
    }
  }

  login(form: NgForm) {
    this.userService.login(form.value);
  }

}
