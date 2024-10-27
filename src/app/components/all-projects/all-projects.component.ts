import { Component } from '@angular/core';
import { ProjectFilterService } from 'src/app/services/project-filter.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent {

  projects

  constructor(private _projectService:ProjectService,private _projectFilterService:ProjectFilterService){}

  ngOnInit(){

    let orgUsername=localStorage.getItem('token')
    this._projectFilterService.statusFilter.subscribe(status=>{
      console.log(status);
      
      if(status=='active'||status=='inactive'){
        this._projectService.getProjectByOrgUsernameAndStatus(orgUsername,status).subscribe(res=>{
          this.projects=res
        })
      }else{
        this._projectService.getAllProjects(orgUsername).subscribe(res=>{
          this.projects=res
        })
      }
    })
  }

  ngOnDestroy(){
    this._projectFilterService.setStatusFilter('all')
  }

}
