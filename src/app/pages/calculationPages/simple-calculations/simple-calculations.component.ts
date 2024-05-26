import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-simple-calculations',
  templateUrl: './simple-calculations.component.html',
  styleUrl: './simple-calculations.component.css'
})
export class SimpleCalculationsComponent {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
    ) {}

  expression: any = {
    "toCalc": ""
  }
  result = "";

  calculation() {

    console.log(this.authService.isAuthenticated);

    if(!this.authService.isAuthenticated) localStorage.setItem('loginTOken', ""); 


    this.http.post(AuthService.serverIP + '/calculation/simple', this.expression).subscribe((res:any)=>{
      this.result = res.result;
    })

  /*  try {
      this.result = eval(this.toCalc);
    } catch (error) {
      this.result = "Ошибка: " + error;
    }*/
  }

}
