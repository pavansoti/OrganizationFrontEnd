import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  
  employeeForm=this._fb.group({
    empFullname:[],
    empRole:[],
    empContact:[],
    empUsername:[],
    empPassword:[],
  })
  empId

  constructor(private _fb:FormBuilder,private _employeeService:EmployeeService,
    private _organizationService:OrganizationService,private _dialogService:DialogService,
    private _router:Router,private _route:ActivatedRoute
  ) {
  }

  ngOnInit(){
    this._route.paramMap.subscribe(param=>{
      this.empId=param.get('employeeId')
      this._employeeService.getEmpByEmpId(this.empId).subscribe(res=>{

      })
    })
  }

  updateEmployee() {

    let allData={
      empFullname:this.employeeForm.value.empFullname,
      empRole:this.employeeForm.value.empRole,
      empContact:this.employeeForm.value.empContact,
      empPassword:this.employeeForm.value.empPassword,
    }
      this._employeeService.updateEmployee(allData,this.empId).subscribe(res1=>{
        this._dialogService.showSuccess('Success','Employee registered with id : ')
        this._router.navigateByUrl(`org/${localStorage.get('token')}/employee/all-employees`)
      },err=>{
        this._dialogService.showFailed('Failed','Username or contact already exists')
      })
    }
}
