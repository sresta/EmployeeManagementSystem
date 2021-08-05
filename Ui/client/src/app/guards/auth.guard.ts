import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../users/user.service';
import { EmployeeService } from '../shared/service/employee.service';
import { Globals } from '../global/global';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private globals: Globals) {

  }
  canActivate(): boolean {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.userService.setGlobal();
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
