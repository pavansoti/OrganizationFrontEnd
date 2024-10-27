import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectFilterService {

  private statusFilterSubject = new BehaviorSubject<string>('all');
  statusFilter = this.statusFilterSubject.asObservable();

  constructor() { }

  setStatusFilter(status: string): void {
    this.statusFilterSubject.next(status);
  }

}
