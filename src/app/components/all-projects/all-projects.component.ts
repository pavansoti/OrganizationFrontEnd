import { Component } from '@angular/core';
import { combineLatest, switchMap } from 'rxjs';
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
    combineLatest([
      this._projectFilterService.statusFilter,
      this._projectFilterService.searchVal
    ]).pipe(
      switchMap(([status, searchVal]) => {
        // Decide the service method based on the role and searchVal
        if (status=='active'||status=='inactive') {
          return this._projectService.getProjectByOrgUsernameAndStatus(orgUsername,status);
        } else if (searchVal) {
          return this._projectService.searchProject(orgUsername,searchVal);
        } else {
          return this._projectService.getAllProjects(orgUsername);
        }
      })
    ).subscribe(res => {
      this.projects = res;
    });
  }

  // ngOnDestroy(){
  //   this._projectFilterService.setStatusFilter('all')
  // }

}
