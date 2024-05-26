import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None

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
    translate.setDefaultLang('ru');
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

  onAbout() {
    this.router.navigateByUrl('/about');
  }

  onChat() {
    this.router.navigateByUrl('/chat');
  }

  onCalculation() {
    this.router.navigateByUrl('/calculations');
  }

}
