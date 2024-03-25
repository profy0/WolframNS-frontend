import { Component } from '@angular/core';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css'
})
export class CalculationComponent {

  toCalc = "";

  result = "";

  calculation() {
    try {
      this.result = eval(this.toCalc);
    } catch (error) {
      this.result = "Ошибка: " + error;
    }
  }

}
