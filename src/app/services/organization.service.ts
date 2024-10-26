import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortService } from './port.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private _port:number=this._portService.port
  private _baseUrl:string=`http://localhost:${this._port}/`

  constructor(private _http:HttpClient,private _portService:PortService) { }


  //login-comp
  validateOrganization(org:any):Observable<any>{
    return this._http.post(this._baseUrl,org)
  }

  //register-comp
  addOrganization(formData:any):Observable<any>{
    console.log(formData,"formData");
    
    return this._http.post(`${this._baseUrl}api/organization/add`,formData, { responseType: 'text' })
  }

  //login-comp
  login(data:any):Observable<any>{
    return this._http.post(`${this._baseUrl}api/organization/login`,data)
  }

  //org-nav-comp
  getOrganization(username:string){
    return this._http.get(`${this._baseUrl}api/organization/get-org/${username}`)
  }

  //add-emp-comp
  getOrganizationSomeDetails(username):Observable<any>{
    return this._http.get(`${this._baseUrl}api/organization/get-org-details/${username}`)
  }

  //forgetpassword-comp
  forgetPassword(){

  }

  //forgetpass-comp
  resetPassword(){
    
  }

}
