import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-project-employees',
  templateUrl: './view-project-employees.component.html',
  styleUrls: ['./view-project-employees.component.css']
})
export class ViewProjectEmployeesComponent {

  orgUsername:string;
  project
  projectId
  constructor(private _route:ActivatedRoute,private _router:Router,
    private _projectService:ProjectService
  ){}

  ngOnInit(){
    let paths=this._router.url.split('/')
    this.orgUsername=paths[2]
    this._route.paramMap.subscribe(params=>{
      this.projectId=params.get('projectId')
      this._projectService.getProjectById(this.projectId).subscribe(res=>{
        this.project=res
      })
    })
    
  }



}
