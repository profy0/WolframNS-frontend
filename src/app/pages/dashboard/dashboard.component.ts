import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  users: any[] = [];
  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  loadUsers() {

    this.http.get('http://localhost:8080/users').subscribe((res:any)=>{
      this.users = res;
    },
      (error) => {
        console.error('У вас нет доступа', error);

        alert('У вас нет прав просматривать эту страницу');
        this.router.navigateByUrl('/main');

      }
    );
  }

}
