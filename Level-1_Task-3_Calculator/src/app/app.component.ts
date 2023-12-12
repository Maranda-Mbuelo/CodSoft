import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  output: string = '0';
  currentInput: string = '';
  operator: string = '';
  prevValue: string = '';

  handleButtonClick(value: string) : void {
    if (value === 'AC') {
      this.clearCalculator();
    } else if (value === '=') {
      this.calculateResult();
    } else if (['+', '-', '×', '÷'].includes(value)) {
      this.handleOperator(value);
    } else {
      this.handleNumber(value);
    }
  }

  handleNumber(value: string) : void {
    if (this.operator === '=') {
      this.clearCalculator();
    }

    this.currentInput += value;
    this.updateOutput();
  }

  handleOperator(value: string) : void {
    if (this.operator !== '') {
      this.calculateResult();
    }

    this.operator = value;
    this.prevValue = this.currentInput;
    this.currentInput = '';
  }

  calculateResult() : void {
    const currentValue = parseFloat(this.currentInput);
    const prevValue = parseFloat(this.prevValue);

    if (!isNaN(currentValue) && !isNaN(prevValue)) {
      switch (this.operator) {
        case '+':
          this.currentInput = (prevValue + currentValue).toString();
          break;
        case '-':
          this.currentInput = (prevValue - currentValue).toString();
          break;
        case '×':
          this.currentInput = (prevValue * currentValue).toString();
          break;
        case '÷':
          this.currentInput = (prevValue / currentValue).toString();
          break;
      }

      this.operator = '';
      this.prevValue = '';
      this.updateOutput();
    }
  }

  clearCalculator() : void {
    this.output = '0';
    this.currentInput = '';
    this.operator = '';
    this.prevValue = '';
  }

  updateOutput() : void {
    this.output = this.currentInput === '' ? '0' : this.currentInput;
  }
}
