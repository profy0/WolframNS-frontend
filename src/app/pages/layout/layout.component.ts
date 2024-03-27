import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
  messageForReg = "";
  token : string = "";

  checkToken() {
    
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) {}

  onLogin() {
      this.router.navigateByUrl('/login');
  }

  logout() {

    this.authService.logout();
    this.router.navigateByUrl('/main');

  }

}
