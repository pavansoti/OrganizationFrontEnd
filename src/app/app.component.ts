import { Component } from '@angular/core';
import { InactivityService } from './services/inactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'organization';
  constructor(private inactivityService: InactivityService){}

  ngOnDestroy() {
    // Stop the timer when component is destroyed
    this.inactivityService.stopInactivityTimer();
  }
}
