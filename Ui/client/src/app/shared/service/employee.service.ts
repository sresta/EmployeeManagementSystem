import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly APIURL = environment.apiURL + '/Employee';

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<any> {
    return this.http.get<any>(`${this.APIURL}`);
  }

  create(employee: any) {
    return this.http.post<any>(`${this.APIURL}`, employee);
  }

  update(id: string, employee: any) {
    return this.http.put<any>(`${this.APIURL}/${id}`, employee);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.APIURL}/${id}`);
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(`${this.APIURL}/${id}`);
  }

}
