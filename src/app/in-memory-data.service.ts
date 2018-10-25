import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './model/employee-model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {employees};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the employees array is empty,
  // the method below returns the initial number (11).
  // if the employees array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 11;
  }
}