import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent {
  operations = [
    { name: 'Простые вычисления', route: '/simple-calculations' },
    { name: 'Работа с матрицами', route: '/matrix-operations' },
    { name: 'Вычисление синуса / косинуса', route: '/trigonometry-operations' },
    { name: 'Системы счисления', route: '/conversion-operations' },
    { name: 'Решение уравнений', route: '/equations-operations' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigateByUrl('/calculations' + route);
  }
}
