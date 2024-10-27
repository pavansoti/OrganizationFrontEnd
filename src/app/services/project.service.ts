import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortService } from './port.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private _baseUrl=`http://localhost:${this._portService.port}/api/project/`

  constructor(private _http:HttpClient,private _portService:PortService) { }

  //add-project-comp
  addProject(projectDetails:any):Observable<any>{
    return this._http.post(`${this._baseUrl}add`,projectDetails,{responseType:'text'})
  }

  //all-project-comp
  getAllProjects(username){
    return this._http.get(`${this._baseUrl}get-projects/${username}`)
  }

  //update-project-comp
  getProjectById(id):Observable<any>{
    return this._http.get(`${this._baseUrl}get-project/${id}`)
  }

  //update-project-comp
  updateProject(project):Observable<any>{
    return this._http.put(`${this._baseUrl}update-project`,project)
  }

  //add-emp-to-pro-comp
  addEmployeeToProject(selectedEmployeeIds,projectId):Observable<any>{
    return this._http.post(`${this._baseUrl}add-emp-to-project/${projectId}`,selectedEmployeeIds,{responseType:'text'})
  }

  //all-project-comp
  getProjectByOrgUsernameAndStatus(username,status):Observable<any>{
    return this._http.get(`${this._baseUrl}get-projects-by/${username}/${status}`)
  }

   //view-project-com
   removeEmployeeFromProject(projectId,empId):Observable<any>{
    return this._http.delete(`${this._baseUrl}remove-emp-project/${projectId}/${empId}`,{responseType:'text'})
  }

  //view-project-com
  closeProject(projectId):Observable<any>{
    return this._http.delete(`${this._baseUrl}close-project/${projectId}`,{responseType:'text'})
  }

}


