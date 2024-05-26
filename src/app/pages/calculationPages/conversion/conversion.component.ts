import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.css'
})
export class ConversionComponent {
  number: string = '';
  fromBase: number = 10;
  toBase: number = 2;
  result: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  convert(): void {

    const convertModel = {
      "number": this.number,
      "fromBase": this.fromBase,
      "toBase": this.toBase
    }

    this.http.post(AuthService.serverIP + '/calculation/conversion', convertModel).subscribe((response: any) => {
      this.result = response.result; 
    });
  }
}
