import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: any = {
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": ""
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onRegister() {
    localStorage.setItem('loginTOken', "");
    this.http.post('http://localhost:8080/api/v1/auth/register', this.registerObj).subscribe((res:any)=>{
         // alert('Registration Success');
          localStorage.setItem('loginTOken', res.token);
          this.authService.login();
          this.router.navigateByUrl('/main');
    });
  }


}
