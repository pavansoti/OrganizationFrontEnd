import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-employee-to-project',
  templateUrl: './add-employee-to-project.component.html',
  styleUrls: ['./add-employee-to-project.component.css']
})
export class AddEmployeeToProjectComponent {

  projectId
  orgUsername
  benchEmps

  selectedEmployeeIds= [];

  constructor(private _route:ActivatedRoute,private __router:Router,
    private _employeeService:EmployeeService,private _dialogService:DialogService,
    private _projectService:ProjectService
  ){}

  ngOnInit(){
    this._route.paramMap.subscribe(params=>{
      this.projectId=params.get('projectId')
      this.orgUsername=localStorage.getItem('token')
      this._employeeService.getBenchEmps(this.orgUsername,this.projectId).subscribe(res=>{
        this.benchEmps=res.filter(emp=>emp.empStatus)
      })
    })
  }

  onCheckboxChange(event: any, empId: number): void {
    if (event.target.checked) {
      this.selectedEmployeeIds.push(empId);
    } else {
      this.selectedEmployeeIds = this.selectedEmployeeIds.filter(id => id !== empId);
    }
  }

  addEmployeeToProject(){
    console.log(this.selectedEmployeeIds);
    this._projectService.addEmployeeToProject(this.selectedEmployeeIds,this.projectId).subscribe(res=>{
      this._dialogService.showSuccess('Success','Added employees to project')
      this.__router.navigateByUrl(`/org/${this.orgUsername}/project/all-projects/view-details/${this.projectId}`)
    })
  }
}
