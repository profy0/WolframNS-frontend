import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css'
})
export class CalculationComponent {

  
  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
    ) {}

  toCalc: any = {
    "toCalc": ""
  }
  result = "";

  calculation() {

    console.log(this.authService.isAuthenticated);

    if(!this.authService.isAuthenticated) localStorage.setItem('loginTOken', ""); 


    this.http.post(AuthService.serverIP + '/calculation', this.toCalc).subscribe((res:any)=>{
      this.result = res.result;
    })

  /*  try {
      this.result = eval(this.toCalc);
    } catch (error) {
      this.result = "Ошибка: " + error;
    }*/
  }

}
