import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
  messageForReg = "";
  token : string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  switchLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.translate.use(selectElement.value);
  }
  
  

  onLogin() {
      this.router.navigateByUrl('/login');
  }

  logout() {

    this.authService.logout();
    this.router.navigateByUrl('/main');

  }

}
