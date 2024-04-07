import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;     // TODO better to keep it in storage

  private userInfo: any = {
      "firstname": "",
      "lastname": "",
      "email": "",
      "password": ""
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get firstname() {
    return this.userInfo.firstname;
  }

  get lastname() {
    return this.userInfo.lastname;
  }

  get email() {
    return this.userInfo.email;
  }

  get password() {
    return this.userInfo.email;
  }

  login() {
    this._isAuthenticated = true;
    this.http.get('http://localhost:8080/user/me').subscribe((res:any)=>{
      this.userInfo = res;
    });
  }

  logout() {
    this.http.get('http://localhost:8080/api/v1/auth/logout').subscribe((res:any)=>{})
    this._isAuthenticated = false;
    localStorage.setItem('loginTOken', "");
  }

}
