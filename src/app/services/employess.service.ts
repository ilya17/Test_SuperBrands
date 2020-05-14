import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../shared/model/employee';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployessService {

  public apiHost = '../../assets/employees.json'

  constructor(private http: HttpClient) { }

  /**
   * Получить всех сотрудников
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.apiHost).pipe(map((employees: Employee[])=> employees));
  }
}
