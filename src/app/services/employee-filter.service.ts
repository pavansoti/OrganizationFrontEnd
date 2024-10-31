import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFilterService {

  constructor() { }

  private roleFilterSubject = new BehaviorSubject<string>('all');
  roleFilter = this.roleFilterSubject.asObservable();


  private searchSubject=new BehaviorSubject<string>('');
  searchVal=this.searchSubject.asObservable();

  setRoleFilter(role: string): void {
    this.roleFilterSubject.next(role);
  }

  setSearchVal(searchVal:string){
    this.searchSubject.next(searchVal)
  }
  
}
