class Calculator {
    constructor(previousOpEl, currentOpEl) {
        this.previousOpEl = previousOpEl;
        this.currentOpEl = currentOpEl;
        this.clear();
    }

    clear() {
        this.currentOp = '';
        this.previousOp = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1);
    }

    appendNumber(num) {
        if(num === '.' && this.currentOp.includes('.')) return;
        this.currentOp = `${this.currentOp}${num}`;
    }

    chooseOperation(op) {
        if(this.currentOp === '') return;
        if(this.previousOp !== '') {
            this.compute();
        }
        this.operation = op;
        this.previousOp = this.currentOp;
        this.currentOp = '';
    }

    compute() {
        let computation = '';
        const prev = +this.previousOp;
        const current = +this.currentOp;
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOp = computation;
        this.operation = undefined;
        this.previousOp = '';
    }

    getDisplayNumber(num) {
        const stringNumber = `${num}`;
        const integerDigits = +stringNumber.split('.')[0];
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay = '';
        integerDisplay = isNaN(integerDigits) ? '' : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        return (decimalDigits != null) ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
     }

    updateDisplay() {
        this.currentOpEl.innerText = this.getDisplayNumber(this.currentOp);
        this.previousOpEl.innerText = (this.operation != null) ? `${this.getDisplayNumber(this.previousOp)} ${this.operation}` : '';
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOpEl = document.querySelector('[data-previous-operand]');
const currentOpEl = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOpEl, currentOpEl);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
  
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});