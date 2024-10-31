import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectFilterService {

  private statusFilterSubject = new BehaviorSubject<string>('all');
  statusFilter = this.statusFilterSubject.asObservable();
  private searchSubject=new BehaviorSubject<string>('');
  searchVal=this.searchSubject.asObservable();
  constructor() { }

  setStatusFilter(status: string): void {
    this.statusFilterSubject.next(status);
  }

  setSearchVal(searchVal:string){
    this.searchSubject.next(searchVal)
  }
}
