import { Injectable } from '@angular/core';
import { Employee } from './model/employee-model';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPLOYEE_DETAILS_HEADER } from './config/employee-fields';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {

  private employeesUrl = 'http://localhost:8080/search';  // URL to web api
  private employeeDetailsHeader: any[];

  constructor(private http: HttpClient,
    private messageService: MessageService) {
      this.employeeDetailsHeader = EMPLOYEE_DETAILS_HEADER;
     }

    getEmployeeDetailsFields(): any[]{
      return this.employeeDetailsHeader;
    }
    /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`Employee service: ${message}`);
}

  getEmployees(): Observable<Employee[]> {
    this.messageService.add('Employee Service: fetched employees');
  
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap(employees => this.log('fetched employees')),
      catchError(this.handleError('getEmployees', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
  return this.http.get<Employee>(url).pipe(
    tap(_ => this.log(`fetched employee id=${id}`)),
    catchError(this.handleError<Employee>(`getEmployee id=${id}`))
  );
  }

  /** PUT: update the employee on the server */
updateEmployee (employee: Employee): Observable<any> {
  return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
    tap(_ => this.log(`updated employee id=${employee.id}`)),
    catchError(this.handleError<any>('updateEmployee'))
  );
}

/** POST: add a new hero to the server */
addEmployee (employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(this.employeesUrl, employee, httpOptions).pipe(
    tap((employee: Employee) => this.log(`added employee w/ id=${employee.id}`)),
    catchError(this.handleError<Employee>('addEmployee'))
  );
}

/** DELETE: delete the Employee from the server */
deleteEmployee (employee: Employee | number): Observable<Employee> {
  const id = typeof employee === 'number' ? employee : employee.id;
  const url = `${this.employeesUrl}/${id}`;

  return this.http.delete<Employee>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted employee id=${id}`)),
    catchError(this.handleError<Employee>('deleteEmployee'))
  );
}

/* GET employees whose name contains search term */
searchEmployees(term: string): Observable<Employee[]> {
  if (!term.trim()) {
    // if not search term, return empty employee array.
    return of([]);
  }
  return this.http.get<Employee[]>(`${this.employeesUrl}/?resourceName=${term}`).pipe(
    tap(_ => this.log(`found employees matching "${term}"`)),
    catchError(this.handleError<Employee[]>('searchEmployees', []))
  );
}

}

