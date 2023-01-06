const numbers = document.querySelectorAll('.num'),
    signs = document.querySelectorAll('.sign'),
    dot = document.querySelector('.dot'),
    display = document.querySelector('input'),
    equal = document.querySelector('.equal'),
    clearBtn = document.querySelector('.c'),
    removeBtn = document.querySelector('.r')

class Calculator {
    display
    signView
    signOperator
    operators = ['+', '-', '✕', '÷']
    isDot = false

    setDisplay(value) {
        display.value = display.value + value
    }

    get lastValue() {
        return display.value[display.value.length - 1]
    }

    get firstValue() {
        return display.value[0]
    }

    numbers(event) {
        const num = +event.target.textContent.trim()

        if (
            this.lastValue == 0 && display.value.length == 1
        ) return display.value = num

        if (
            this.lastValue == 0 && this.signView
        ) return display.value = display.value.slice(0, -1) + num

        return this.setDisplay(num)
    }

    signs(event) {
        const signView = event.target.textContent.trim()
        const signOperator = event.target.dataset.sign.trim()

        if (
            this.operators.includes(this.lastValue)
        ) return display.value = display.value.slice(0, -1) + signView

        if (
            this.signOperator ||
            !display.value ||
            this.lastValue == '.'
        ) return

        this.signView = signView
        this.signOperator = signOperator
        return this.setDisplay(signView)
    }

    dot() {

        if (
            !display.value ||
            this.operators.includes(this.lastValue)
        ) {
            display.value = display.value + '0.'
            return this.isDot = true
        }

        if (
            !display.value ||
            this.lastValue == '.' ||
            this.operators.includes(this.lastValue) ||
            this.isDot
        ) return

        return this.setDisplay('.')
    }

    calculate() {
        const [num1, num2] = display.value.split(this.signView)
        display.value = eval(num1 + this.signOperator + num2)
    }

    clear() {
        display.value = null

        this.signView = null
        this.signOperator = null
        this.isDot = false
    }

    remove() {

        if (
            this.operators.includes(this.lastValue)
        ) {
            this.signView = null
            this.signOperator = null
            if (display.value.includes('.')) {
                this.isDot = true
            }
        }

        if (this.lastValue == '.') {
            this.isDot = false
        }

        display.value = display.value.slice(0, -1)
    }
}

let calculator = new Calculator()

for (const number of numbers) {
    number.onclick = (event) => {
        return calculator.numbers(event)
    }
}

for (const sign of signs) {
    sign.onclick = (event) => {
        return calculator.signs(event)
    }
}

dot.onclick = () => {
    calculator.dot()
}

clearBtn.onclick = () => {
    calculator.clear()
}

removeBtn.onclick = () => {
    calculator.remove()
}

equal.onclick = () => {
    calculator.calculate()
}
