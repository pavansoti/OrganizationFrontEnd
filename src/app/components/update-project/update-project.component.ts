import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {

  orgUsername:string;

  projectForm=this._fb.group({
    "projectName":["projectName"],
    "projectStartDate":['2024-11-01'],
    "projectEndDate":['2024-11-11'],
    "projectDescription":["projectDescription"]
  });

  projectId
  constructor(private _route:ActivatedRoute,private _router:Router,
    private _fb:FormBuilder,private _projectService:ProjectService,
    private _dialogService:DialogService
  ){}

  ngOnInit(){
    let paths=this._router.url.split('/')
    this.orgUsername=paths[2]
    this._route.paramMap.subscribe(params=>{
      this.projectId= params.get('projectId')
      this._projectService.getProjectById(this.projectId).subscribe(res=>{ 
        this.projectForm.patchValue({
          "projectName":res.projectName,
          "projectStartDate":res.projectStartDate,
          "projectEndDate":res.projectEndDate,
          "projectDescription":res.projectDescription
        })
      })
    })
    
  }

  updateProject() {
    let updateProject={
      "projectName":this.projectForm.value.projectName,
      "projectStartDate":this.projectForm.value.projectStartDate,
      "projectEndDate":this.projectForm.value.projectEndDate,
      "projectDescription":this.projectForm.value.projectDescription,
      "projectId":this.projectId
    }
    this._projectService.updateProject(updateProject).subscribe(res=>{
      if(res){
        this._dialogService.showSuccess('Success','Project updated successfully')
        this._router.navigateByUrl(`/org/${this.orgUsername}/project/all-projects`)
      }
    })
    this._dialogService.showSuccess('title','msg')
  }
}
