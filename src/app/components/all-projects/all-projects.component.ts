import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent {

  projects

  constructor(private _projectService:ProjectService){}

  ngOnInit(){
    this._projectService.getAllProjects(localStorage.getItem('token')).subscribe(res=>{
      this.projects=res
      console.log(res);
      
    })
  }

}
