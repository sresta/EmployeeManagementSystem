import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Globals {
  id: string;
  userName: string;
  email: string;
  role: string;
  departmentId: number;
  address: string;

  department: any = {
    1: 'Development',
    2: 'Quality Assuarance',
    3: 'Management'
  };
}
