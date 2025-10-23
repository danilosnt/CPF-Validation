const readline = require('readline');

class ValidateCPF {
    constructor(submittedCPF) {
        Object.defineProperty(this, 'cleanCPF', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: submittedCPF.replace(/\D+/g, '')
        });
    }

    isSequence() {
        if (!this.cleanCPF || this.cleanCPF.length === 0) return false;
        return this.cleanCPF[0].repeat(this.cleanCPF.length) === this.cleanCPF;
    }

    static generateDigit(cpfWithoutDigits) {
        let total = 0;
        let regressiveCounter = cpfWithoutDigits.length + 1;

        for (let stgNum of cpfWithoutDigits) {
            total += regressiveCounter * Number(stgNum);
            regressiveCounter--;
        }

        const digit = 11 - (total % 11);

        return digit <= 9 ? String(digit) : '0';
    }

    generateNewCPF() {
        const cpfWithoutDigits = this.cleanCPF.slice(0, -2);
        const digit1 = ValidateCPF.generateDigit(cpfWithoutDigits);
        const digit2 = ValidateCPF.generateDigit(cpfWithoutDigits + digit1);
        return (cpfWithoutDigits + digit1 + digit2);
    }

    validate() {
        if (!this.cleanCPF) return false;
        if (typeof this.cleanCPF !== 'string') return false;
        if (this.cleanCPF.length !== 11) return false;
        if (this.isSequence()) return false;
        const newCPF = this.generateNewCPF();

        return newCPF === this.cleanCPF;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askForCPF() {
    rl.question('Enter CPF to validate (or "exit" to quit): ', (cpfInput) => {
        if (cpfInput.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        const cpf = new ValidateCPF(cpfInput);

        if (cpf.validate()) {
            console.log(`-> The CPF "${cpfInput}" is VALID.\n`);
        } else {
            console.log(`-> The CPF "${cpfInput}" is INVALID.\n`);
        }

        askForCPF();
    });
}

console.log('=== CPF Validator ===');
askForCPF();