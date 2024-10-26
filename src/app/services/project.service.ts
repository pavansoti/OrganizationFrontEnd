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

}


