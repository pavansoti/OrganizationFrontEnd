import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortService } from './port.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private _port:number=this._portService.port
  private _baseUrl:string=`http://localhost:${this._port}/api/organization/`

  constructor(private _http:HttpClient,private _portService:PortService) { }


  //login-comp
  validateOrganization(org:any):Observable<any>{
    return this._http.post(this._baseUrl,org)
  }

  //register-comp
  addOrganization(formData:any):Observable<any>{
    return this._http.post(`${this._baseUrl}add`,formData, { responseType: 'text' })
  }

  //login-comp
  login(data:any):Observable<any>{
    return this._http.post(`${this._baseUrl}login`,data)
  }

  //org-nav-comp
  getOrganization(username:string){
    return this._http.get(`${this._baseUrl}get-org/${username}`)
  }

  //add-emp-comp
  getOrganizationSomeDetails(username):Observable<any>{
    return this._http.get(`${this._baseUrl}get-org-details/${username}`)
  }

  //org-home-comp
  getOrgDashboardData(orgUsername:string):Observable<any>{
    return this._http.get(`${this._baseUrl}org-dashboard-data/${orgUsername}`)
  }

  //forgetpassword-comp
  forgetPassword(){

  }

  //forgetpass-comp
  resetPassword(){
    
  }

}
