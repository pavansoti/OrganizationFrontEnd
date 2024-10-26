import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employeeForm=this._fb.group({
    empFullname:['anil'],
    empRole:['developer'],
    empContact:[65656456],
    empUsername:['aaa'],
    empPassword:['pass'],
    empDoj:['2022-10-01']
  })

  constructor(private _fb:FormBuilder,private _employeeServicee:EmployeeService,
    private _organizationService:OrganizationService,private _dialogService:DialogService,
    private _router:Router
  ) {
  }

  ngOnInit(){
    
  }

  add() {
    console.log(this.employeeForm.value)
    let allData={
      empFullname:this.employeeForm.value.empFullname,
      empRole:this.employeeForm.value.empRole,
      empContact:this.employeeForm.value.empContact,
      empUsername:this.employeeForm.value.empUsername,
      empPassword:this.employeeForm.value.empPassword,
      empDoj:this.employeeForm.value.empDoj
    }


    this._organizationService.getOrganizationSomeDetails(localStorage.getItem('token')).subscribe((res)=>{
      allData['organization']=res;
      this._employeeServicee.addEmployee(allData).subscribe(res1=>{
        this._dialogService.showSuccess('Success','Employee registered with id : ')
        this._router.navigateByUrl(`org/${res.orgUsername}/employee/all-employees`)
      },err=>{
        this._dialogService.showFailed('Failed','Username or contact already exists')
      })
      
    })

    // this._employeeServicee.addEmployee()

  }
}
