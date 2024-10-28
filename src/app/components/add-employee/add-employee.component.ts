import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    empFullname:['',[Validators.pattern(/^[a-zA-Z-' ]+$/),
      Validators.minLength(4),Validators.required]],
    empUsername:['',[Validators.minLength(4),Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9@._-]*$/)]],
    empContact:[,[Validators.pattern(/^\d{10}$/),Validators.required]],
    empRole:['',[Validators.required]],
    empPassword:['',[Validators.minLength(6),Validators.required]],
    empDoj:['',[Validators.required]]
  })

  constructor(private _fb:FormBuilder,private _employeeServicee:EmployeeService,
    private _organizationService:OrganizationService,private _dialogService:DialogService,
    private _router:Router
  ) {
  }

  ngOnInit(){
    
  }

  addEmployee() {
    if(this.employeeForm.valid){
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
    }else{
      this.employeeForm.markAllAsTouched();
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

  get empUsername(){
    return this.employeeForm.get('empUsername')
  }

  get empPassword(){
    return this.employeeForm.get('empPassword')
  }
  
  get empDoj(){
    return this.employeeForm.get('empDoj')
  }

  get usernameCheckStart() {
    const username = this.empUsername?.value || '';
    return username.length > 0 && !/^[a-zA-Z]/.test(username);
  }

  get usernameCheckSpace() {
    const username = this.empUsername?.value || '';
    return username.includes(' ');
  }

  get isUsernameValid() {
    const username = this.empUsername?.value;
    const pattern = /^[a-zA-Z][a-zA-Z0-9@._-]*$/;
    return pattern.test(username);
  }
}
