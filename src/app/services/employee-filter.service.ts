import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFilterService {

  constructor() { }

  private roleFilterSubject = new BehaviorSubject<string>('all');
  roleFilter = this.roleFilterSubject.asObservable();

  setRoleFilter(role: string): void {
    this.roleFilterSubject.next(role);
  }

  
}
