import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Globals } from '../global/global';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.apiURL + '/account/';
  authorizedUser$: Subject<AuthorizedUser> = new Subject<AuthorizedUser>();

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private global: Globals,
    private toastr: ToastrService) {
  }

  formRegisterModel = this.formBuilder.group(
    {
      Email: ['', Validators.email],
      Passwords: this.formBuilder.group(
        {
          Password: ['', [Validators.required, Validators.minLength(4)]],
          ConfirmPassword: ['', Validators.required]
        },
        {
          validator: this.comparePasswords
        })
    });

  register() {
    const body = {
      Email: this.formRegisterModel.value.Email,
      Password: this.formRegisterModel.value.Passwords.Password,
      ConfirmPassword: this.formRegisterModel.value.Passwords.ConfirmPassword
    };
    return this.httpClient.post(this.baseUrl + 'api/account/register', body);
  }

  login(user: any) {
    this.authorizedUser$.next({
      Email: ''
    });
    this.httpClient.post(this.baseUrl + 'Login', user)
      .subscribe((res: any) => {
        this.authorizedUser$.next({
          Email: res.email
        });
        this.setLocalStorage(res);
        if (res.role === "Admin") {
          this.router.navigateByUrl('/employee');
        } else {
          this.router.navigateByUrl('/user-profile');
        }
      }, (err) => {
        this.toastr.error(err.error.message);
      });
  }

  setLocalStorage(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('userName', data.userName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.role);
    localStorage.setItem('departmentId', data.departmentId);
    localStorage.setItem('address', data.departmentId);
  }

  setGlobal() {
    this.global.id = localStorage.getItem('id') || '';
    this.global.userName = localStorage.getItem('userName') || '';
    this.global.email = localStorage.getItem('email') || '';
    this.global.role = localStorage.getItem('role') || '';
    this.global.address = localStorage.getItem('address') || '';
    this.global.departmentId = localStorage.getItem('departmentId') ? Number(localStorage.getItem('departmentId')) : 0;
  }

  logout() {
    this.httpClient.post(this.baseUrl + 'Logout', {})
      .subscribe(res => {
        this.authorizedUser$.next(undefined);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');

      });
  }

  authorizedUser() {
    return localStorage.getItem('token') != null;
  }

  getAuthorizedUserEmail() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token'.split('.')[1]);
      return JSON.parse(window.atob(token)).Email;
    }
    else {
      return '';
    }
  }

  comparePasswords(formBuilder: FormGroup) {
    const confirmPassword = formBuilder.get('ConfirmPassword');
    if (confirmPassword.errors == null || 'passwordMismatch' in confirmPassword.errors) {
      if (formBuilder.get('Password').value != confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
      else {
        confirmPassword.setErrors(null);
      }
    }
  }
}

export interface AuthorizedUser {
  Email: string;
}
