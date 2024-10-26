import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticate():boolean{
    return !!localStorage.getItem('token')
  }
}
