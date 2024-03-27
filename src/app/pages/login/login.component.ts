import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginObj: any = {
      "email": "",
      "password": ""
    };

    constructor(
      private http: HttpClient, 
      private router: Router, 
      private authService: AuthService
    ) {}

    onLogin() {
      localStorage.setItem('loginTOken', "");
      this.http.post('http://localhost:8080/api/v1/auth/authenticate', this.loginObj).subscribe((res:any)=>{
          if(res.result) {
            //alert('login success');
            localStorage.setItem('loginTOken', res.token);
            this.authService.login();
            this.router.navigateByUrl('/main');
          } else {
            alert(res.token);
          }
      });
    }

}
