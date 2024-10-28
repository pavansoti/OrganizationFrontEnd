import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    "projectName":['',[]],
    "projectStartDate":['',[]],
    "projectEndDate":['',[Validators.required]],
    "projectDescription":['',[Validators.required, Validators.maxLength(255)]]
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
    this.projectForm.get('projectName').disable()
    this.projectForm.get('projectStartDate').disable()
    
  }

  updateProject() {
      if(this.projectForm.valid){
      let updateProject={
        "projectName":this.projectForm.get('projectName').value,
        "projectStartDate":this.projectForm.get('projectStartDate').value,
        "projectEndDate":this.projectForm.get('projectEndDate').value,
        "projectDescription":this.projectForm.get('projectDescription').value,
        "projectId":this.projectId
      }
      this._projectService.updateProject(updateProject).subscribe(res=>{
        if(res){
          this._dialogService.showSuccess('Success','Project updated successfully')
          this._router.navigateByUrl(`/org/${this.orgUsername}/project/all-projects`)
        }else{
          this._dialogService.showFailed('Error','Failed to update!!!')
        }
      })
    }else{
      this._dialogService.showFailed('Failed','Invalid form!!!')
    }
  }

  get projectEndDate(){
    return this.projectForm.get('projectEndDate')
  }

  get projectDescription(){
    return this.projectForm.get('projectDescription')
  }
}
