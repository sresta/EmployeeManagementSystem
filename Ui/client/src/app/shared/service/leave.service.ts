import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  readonly APIURL = environment.apiURL + '/Leaves';

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.APIURL}`);
  }

  update(id: string, leave: any) {
    return this.http.put<any>(`${this.APIURL}/${id}`, leave);
  }

  create(leave: any) {
    return this.http.post<any>(`${this.APIURL}`, leave);
  }

  getEmployeeLeave(employeeId: string) {
    return this.http.get<any>(`${this.APIURL}/EmployeeLeave/${employeeId}`);
  }
}
