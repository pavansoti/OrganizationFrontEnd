import { Component } from '@angular/core';
import { combineLatest, switchMap } from 'rxjs';
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
     // Use combineLatest to listen to both roleFilter and searchVal streams.
     combineLatest([
      this._employeeFilterService.roleFilter,
      this._employeeFilterService.searchVal
    ]).pipe(
      switchMap(([role, searchVal]) => {
        // Decide the service method based on the role and searchVal
        if (role === 'developer' || role === 'tester') {
          return this._employeeService.getEmpByOrgUsernameAndEmpRole(orgUsername, role);
        } else if (searchVal) {
          return this._employeeService.searchEmployees(orgUsername, searchVal);
        } else {
          return this._employeeService.getEmpByOrg(orgUsername);
        }
      })
    ).subscribe(res => {
      this.employees = res;
    });
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

  // ngOnDestroy(){
  //   console.log("111");
    
  //   this._employeeFilterService.setSearchVal('')
  // }
}
