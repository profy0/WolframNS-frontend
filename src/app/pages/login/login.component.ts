import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private http: HttpClient, private router: Router) {}

    onLogin() {
      this.http.post('http://localhost:8080/api/v1/auth/authenticate', this.loginObj).subscribe((res:any)=>{
          if(res.result) {
            alert('login Success');
            localStorage.setItem('loginTOken', res.token);
            this.router.navigateByUrl('/dashboard');
            
          } else {
            alert(res.token);
          }
      });
    }

}
