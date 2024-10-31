import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private inactivityTimeout = 10000; // 10 sec in milliseconds
  private inactivityEvents$ = merge(
    fromEvent(document, 'mousemove'),
    fromEvent(document, 'mousedown'),
    fromEvent(document, 'keypress'),
    fromEvent(document, 'touchstart'),
    fromEvent(document, 'scroll')
  );
  private stopTimer$ = new Subject<void>();
  constructor(private _router:Router,private _dialogService:DialogService) {
    this.startInactivityTimer()
   }

  private startInactivityTimer() {
    this.inactivityEvents$
      .pipe(
        takeUntil(this.stopTimer$),
        switchMap(() => timer(this.inactivityTimeout))
      )
      .subscribe(() => this.logoutUser());
  }

  private logoutUser() {
    let path=this._router.url.split('/')[1]
    if(path=='org'){
      // Perform the logout operation, e.g., clear session, navigate to login
      this._dialogService.showInfo('You are logged out','You are inactive for too long')
      this._router.navigate(['/login'])
    }
  }

  stopInactivityTimer() {
    this.stopTimer$.next();
  }

}
