import { Component, OnInit } from '@angular/core';
import { Employee} from '../model/employee-model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {


  employees: Employee[];
  cols: any[];

  constructor(private employeeService: EmployeeService) { }

  getEmployees(): void {
    this.employeeService.getEmployees()
        .subscribe(employees => this.employees = employees);
  }
  ngOnInit() {
    this.cols = this.employeeService.getEmployeeDetailsFields();
    this.getEmployees();
  }

  

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

}
