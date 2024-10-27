import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeService } from 'src/app/services/employee.service';
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
  employees
  constructor(private _route:ActivatedRoute,private _router:Router,
    private _projectService:ProjectService, private _dialogService:DialogService
  ){}

  ngOnInit(){
    let paths=this._router.url.split('/')
    this.orgUsername=paths[2]
    this._route.paramMap.subscribe(params=>{
      this.projectId=params.get('projectId')
      this._projectService.getProjectById(this.projectId).subscribe(res=>{
        this.project=res
        this.employees=res.employees
      })
    })
    
  }

  removeEmployee(empId){
    this._projectService.removeEmployeeFromProject(this.projectId,empId).subscribe(res=>{
      if(res){
        this._dialogService.showSuccess('Success','Employee removed from project')
        this.ngOnInit()
      }else{
        this._dialogService.showFailed('Failed','Try again')
        this.ngOnInit()
      }
    })
  }

  closeProject(projectId){
    this._projectService.closeProject(projectId).subscribe(res=>{
      if(res){
        this._dialogService.showSuccess('Success','Project closed')
        this.ngOnInit();
      }else{
        this._dialogService.showFailed('Error','Failed to colse project')
      }
    })
  }

}
