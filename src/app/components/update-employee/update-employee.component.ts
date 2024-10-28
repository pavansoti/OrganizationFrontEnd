import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    empFullname:['',[Validators.pattern(/^[a-zA-Z-' ]+$/),
      Validators.minLength(4),Validators.required]],
    empRole:['',[Validators.required]],
    empContact:['',[Validators.pattern(/^\d{10}$/),Validators.required]],
    empUsername:[''],
    empPassword:['',[Validators.minLength(6),Validators.required]],
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
        this.employeeForm.patchValue({
          empFullname:res.empFullname,
          empRole:res.empRole,
          empContact:res.empContact,
          empUsername:res.empUsername,
          empPassword:res.empPassword,
        })
      })
    })
    this.employeeForm.get('empUsername')?.disable();
  }

  updateEmployee() {
    if(this.employeeForm.valid){
      let username=localStorage.getItem('token')
      let allData={
        empUsername:this.employeeForm.get('empUsername')?.value,
        empFullname:this.employeeForm.value.empFullname,
        empRole:this.employeeForm.value.empRole,
        empContact:this.employeeForm.value.empContact,
        empPassword:this.employeeForm.value.empPassword,
      }
      
        this._employeeService.updateEmployee(allData,this.empId).subscribe(res=>{
          if(res){
          this._dialogService.showSuccess('Success','updated successfully')
          this._router.navigateByUrl(`org/${username}/employee/all-employees`)
          }else{
            this._dialogService.showFailed('Failed','Try again!!!')
          }
        })
    }else{
      this.employeeForm.markAllAsTouched()
      this._dialogService.showFailed('Failed','Invalid form!!!')
    }
  }

  get empFullname(){
    return this.employeeForm.get('empFullname')
  }

  get empRole(){
    return this.employeeForm.get('empRole')
  }

  get empContact(){
    return this.employeeForm.get('empContact')
  }

  get empPassword(){
    return this.employeeForm.get('empPassword')
  }
  
  get empDoj(){
    return this.employeeForm.get('empDoj')
  }

}
