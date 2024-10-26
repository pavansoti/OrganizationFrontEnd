import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-organization-employee',
  templateUrl: './organization-employee.component.html',
  styleUrls: ['./organization-employee.component.css']
})
export class OrganizationEmployeeComponent {

  navigateTo:string='list-emp'

 

  change(navigateTo:string){
    this.navigateTo=navigateTo
  }
}
