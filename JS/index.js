let firstNumber = '0'
let secondNumber = ''
let isTheFirstNumber = true
let operator = ''
let isNegative = false
let result = null

document.addEventListener('keydown', (key) => {
    toListenTheButtons(key.key)
})

function toListenTheButtons(textContent) {
    if (!(isNaN(parseInt(textContent)))) { // Only numbers
        IsTheFirstNumber(textContent)
    } else {
        switch (textContent) {
            case 'C':
            case 'Backspace':
                firstNumber = '0'
                secondNumber = ''
                operator = ''
                isTheFirstNumber = true
                isNegative = false
                break
            case '÷':
            case '/':
            case 'x':
            case '*':
            case '-':
            case '+':
                operator = textContent.replace('/', '÷')
                operator = operator.replace('*', 'x')
                isTheFirstNumber = false
                isNegative = false
                break
            case '=':
            case 'Enter':
                calculateResult()
                break
            case '+/-':
                toggleNegativity()
                break
            case ',':
                if (isTheFirstNumber) {
                    if (!(firstNumber.includes(','))) {
                        firstNumber += ','
                        if (firstNumber.startsWith(',')) {
                            firstNumber = '0' + firstNumber
                        }
                    }
                } else {
                    if (!(secondNumber.includes(','))) {
                        secondNumber += ','
                        if (secondNumber.startsWith(',')) {
                            secondNumber = '0' + secondNumber
                        }
                    }
                }
        }
    }

    updateDisplay(textContent)
}

function IsTheFirstNumber(textContent) {
    if (isTheFirstNumber) {
        if (!(textContent === '0' && firstNumber === '0')) {
            if (firstNumber === '0') {
                firstNumber = textContent
            } else if (firstNumber.length < 7) {
                firstNumber += textContent
            }
        }
    } else {
        if (secondNumber.length < 7) {
            secondNumber += textContent
        }
    }
}

function calculateResult() {
    firstNumber = firstNumber.replace(',', '.')
    secondNumber = secondNumber.replace(',', '.')

    const num1 = parseFloat(firstNumber)
    const num2 = parseFloat(secondNumber)
    
    switch (operator) {
        case '÷':
        case '/':
            result = num1 / num2
            break
        case 'x':
        case '*':
            result = num1 * num2
            break
        case '-':
            result = num1 - num2
            break
        case '+':
            result = num1 + num2
            break
        default:
            result = num1
            if (isNaN(result)) {
                result = 0
            }

    }

    firstNumber = String(result).replace('.', ',')
    secondNumber = ''
    operator = ''
    isTheFirstNumber = true
}

function toggleNegativity() {
    if (isTheFirstNumber) {
        if (firstNumber.startsWith('-')) {
            firstNumber = firstNumber.slice(1)
        } else {
            if (!(firstNumber === '' || firstNumber === '0')) {
                firstNumber = '-' + firstNumber
            }
        }
    } else {
        if (secondNumber.startsWith('-')) {
            secondNumber = secondNumber.slice(1)
        } else {
            if (!(secondNumber === '' || secondNumber === '0')) {
                secondNumber = '-' + secondNumber
            }
        }
    }
}

function updateDisplay(textContent) {
    if (firstNumber === '') {
        document.getElementById('display2').textContent = '0'
    } else {
        if (operator === '') {
            document.getElementById('display2').textContent = firstNumber
            document.getElementById('display').textContent = ''
        } else if (textContent !== '=') {
            document.getElementById('display').textContent = `${firstNumber} ${operator}`
            document.getElementById('display2').textContent = secondNumber
        } else {
            document.getElementById('display').textContent = `${firstNumber} ${operator} ${secondNumber} =`
            document.getElementById('display2').textContent = firstNumber
        }
    }
}
