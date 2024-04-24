import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private http: HttpClient, private router: Router) {}

  

  onLog() {
      this.router.navigateByUrl('/login');
  }

  onReg() {
      this.router.navigateByUrl('/registration');
  }

  onCalc() {
    this.router.navigateByUrl('/calculations');
  }

  getUsers() {
    this.router.navigateByUrl('/dashboard');
  }

}
