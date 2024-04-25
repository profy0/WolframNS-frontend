import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;

  public static readonly serverIP = 'https://df27-217-21-43-190.ngrok-free.app';

  public userInfo: any = {
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
    this.http.get(AuthService.serverIP + '/user/me', {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true'
      })
    }).subscribe((res:any)=>{
      this.userInfo = res;
    });
  }

  logout() {
    this.http.get(AuthService.serverIP + '/api/v1/auth/logout',{
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true'
      })
    }).subscribe((res:any)=>{})
    this._isAuthenticated = false;
    localStorage.setItem('loginTOken', "");
  }

}
