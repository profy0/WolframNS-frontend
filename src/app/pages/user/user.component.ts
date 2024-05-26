import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PrivateChatComponent } from '../private-chat/private-chat.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  
  constructor(public authService: AuthService, private router: Router) {}

  redirectToMessages() {
    this.router.navigateByUrl('/private-chat')
    
  }

}
