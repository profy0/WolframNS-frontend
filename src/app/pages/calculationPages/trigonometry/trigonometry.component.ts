import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-trigonometry',
  templateUrl: './trigonometry.component.html',
  styleUrls: ['./trigonometry.component.css']
})
export class TrigonometryComponent {
  angleDegrees: number = 0;
  terms: number = 1;
  result: { sin: number, cos: number } | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  calculate() {
    const angleRadians = this.angleDegrees * (Math.PI / 180);

    const payload = {
      angle: angleRadians,
      terms: this.terms
    };


    this.http.post(AuthService.serverIP + '/calculation/trigonometry', payload).subscribe((response: any) => {
      this.result = {
        "sin": response.sin,
        "cos": response.cos
      }
    });

  }
}
