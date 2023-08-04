import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calculator';
  currentInput: string = '0';
  previousInput: string = '';
  operator: string = '';
  result: number = 0;
  history: string[] = [];

  isOperator(item: string): boolean {
    return ['+', '-', '*', '/'].includes(item);
  }

  handleNumberClick(value: string) {
    if (this.operator === '=') {
      this.currentInput = value;
      this.operator = '';
      this.history = [];
    } else if (this.currentInput === '0') {
      this.currentInput = value;
    } else {
      this.currentInput += value;
    }
  }

  handleOperatorClick(operator: string) {
    if (this.currentInput !== '0') {
      if (this.operator !== '') {
        this.calculateResult();
        this.operator = operator;
        this.history.push(this.operator);
      } else {
        this.operator = operator;
        this.previousInput = this.currentInput;
        this.history.push(this.previousInput, this.operator);
      }
      this.currentInput = '0';
    }
  }

  handleDecimalClick() {
    if (!this.currentInput.includes('.')) {
      this.currentInput += '.';
    }
  }

  handleClearClick() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = '';
    this.result = 0;
    this.history = [];
  }

  calculateResult() {
    const num1 = parseFloat(this.previousInput);
    const num2 = parseFloat(this.currentInput);

    switch (this.operator) {
      case '+':
        this.result = num1 + num2;
        break;
      case '-':
        this.result = num1 - num2;
        break;
      case '*':
        this.result = num1 * num2;
        break;
      case '/':
        this.result = num1 / num2;
        break;
      default:
        break;
    }
  }

  handleEqualClick() {
    if (this.operator && this.previousInput !== '') {
      this.calculateResult();
      this.operator = '=';
      this.history.push(
        this.currentInput,
        this.operator,
        this.result.toString()
      );
      this.currentInput = this.result.toString();
      this.previousInput = '';
    }
  }
}
