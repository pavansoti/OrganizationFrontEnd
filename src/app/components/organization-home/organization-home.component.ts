import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.css']
})
export class OrganizationHomeComponent {

  totalProjects: number=0;
  completedProjects: number = 0;
  pendingProjects:number=0;
  progressPercentage: number = 0;

  totalOrgEmployees:number=0;
  developers:number=0;
  testers:number=0;

  constructor(private _organizationService:OrganizationService){}

  ngOnInit() {
    const orgUsername=localStorage.getItem('token')
    this._organizationService.getOrgDashboardData(orgUsername).subscribe(res=>{
      if(res){
        if(res.totalProjects)
          this.totalProjects=res.totalProjects
        if(res.completedProjects)
          this.completedProjects=res.completedProjects
        if(res.pendingProjects)
          this.pendingProjects=res.pendingProjects
        if(res.totalOrgEmployees)
          this.totalOrgEmployees=res.totalOrgEmployees
        if(res.developers)
          this.developers=res.developers
        if(res.testers)
          this.testers=res.testers
        if (this.totalProjects > 0) {
          this.progressPercentage = Math.round((this.completedProjects / this.totalProjects) * 100)
        }
      }
    })
  }
}
