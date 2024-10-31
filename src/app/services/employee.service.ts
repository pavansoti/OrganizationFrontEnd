import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortService } from './port.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _baseUrl=`http://localhost:${this._portService.port}/employee/`


  constructor(private _http:HttpClient,private _portService:PortService) { }

  //employee-comp
  addEmployee(employee:any):Observable<any>{
    return this._http.post(`${this._baseUrl}add`,employee)
  }

  //all-emp-comp
  getEmpByOrg(username:string):Observable<any>{
    return this._http.get(`${this._baseUrl}get-emps/${username}`)
  }

  //all-emp-comp
  getEmpByOrgUsernameAndEmpRole(username:string,role:string):Observable<any>{
    return this._http.get(`${this._baseUrl}viewByRole/${role}/${username}`)
  }

  //update-emp-comp
  getEmpByEmpId(empId):Observable<any>{
    return this._http.get(`${this._baseUrl}getempById/${empId}`)
  }

  //update-emp-comp
  updateEmployee(emp,empId):Observable<any>{
    return this._http.put(`${this._baseUrl}update/${empId}`,emp)
  }

  //all-emp-comp
  deleteEmployee(empId):Observable<any>{
    return this._http.delete(`${this._baseUrl}delete/${empId}`,{responseType:'text'})
  }

  //add-emp-to-pro-comp
  getBenchEmps(orgUsername,projectId):Observable<any>{
    return this._http.get(`${this._baseUrl}get-bench-emps/${orgUsername}/${projectId}`)
  }

  //all-emp-comp
  searchEmployees(orgUsername,val):Observable<any>{
    console.log(orgUsername,val);
    
    return this._http.get(`${this._baseUrl}get-emps-search/${orgUsername}/${val}`)
  }

}
