import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {
  matrix1: string = '';
  matrix2: string = '';
  operation: string = 'add';
  result: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  onSubmit(): void {
    const matrices = {
      matrix1: this.parseMatrix(this.matrix1),
      matrix2: this.parseMatrix(this.matrix2),
      operation: this.operation
    };

    this.http.post(AuthService.serverIP + '/calculation/matrix', matrices).subscribe((response: any) => {
      this.result = this.formatMatrix(response.result);
    });
  }

  private parseMatrix(input: string): number[][] {
    return input.trim().split('\n').map(row => row.trim().split(' ').map(Number));
  }

  private formatMatrix(matrix: number[][]): string {
    return matrix.map(row => row.join(' ')).join('\n');
  }
}
