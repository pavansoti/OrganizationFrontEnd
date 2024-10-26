import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-project',
  templateUrl: './organization-project.component.html',
  styleUrls: ['./organization-project.component.css']
})
export class OrganizationProjectComponent {
routeSegment: string;

change(navigatetTo: string) {
throw new Error('Method not implemented.');
}

constructor(private _router:Router){}

ngOnInit(){
  
}

}
