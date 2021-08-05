import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly APIURL = environment.apiURL + '/Departments';

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.APIURL}`);
  }
}
