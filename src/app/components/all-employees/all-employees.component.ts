import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { EmployeeFilterService } from 'src/app/services/employee-filter.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent {


  employees=[]

  constructor(private _employeeService: EmployeeService,private _employeeFilterService:EmployeeFilterService,
    private _dialogService:DialogService
  ){}

  ngOnInit(){
    let orgUsername=localStorage.getItem('token')
    this._employeeFilterService.roleFilter.subscribe(role=>{
      if(role=='all'){
        this._employeeService.getEmpByOrg(orgUsername).subscribe(res=>{
          this.employees=res;
        })
      }
      else{
        this._employeeService.getEmpByOrgUsernameAndEmpRole(orgUsername,role).subscribe(res=>{
          this.employees=res;
        })
      }
    })
  }

  deleteEmployee(empId){
    this._employeeService.deleteEmployee(empId).subscribe(res=>{
      if(res){
        this._dialogService.showSuccess('Success','Employee deleted successfully')
        this.ngOnInit()
      }else{
        this._dialogService.showFailed('Failed','Try again')
      }
    })
  }
  
  ngOnDestroy(){
    this._employeeFilterService.setRoleFilter('all')
  }
}
