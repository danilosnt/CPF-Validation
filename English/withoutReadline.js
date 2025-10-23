function ValidateCPF(submittedCPF) {
    Object.defineProperty(this, 'cleanCPF', {
        enumerable: true,
        get: function () {
            return submittedCPF.replace(/\D+/g, '');
        }
    })
}

ValidateCPF.prototype.validate = function () {
    if (typeof this.cleanCPF === undefined) return false;
    if (this.cleanCPF.length !== 11) return false;
    if (this.isSequence()) return false;
    const partialCPF = this.cleanCPF.slice(0, -2);
    const digit1 = this.createDigit(partialCPF);
    const digit2 = this.createDigit(partialCPF + digit1);

    const newCPF = partialCPF + digit1 + digit2;

    return newCPF === this.cleanCPF;
};

ValidateCPF.prototype.createDigit = function (partialCPF) {
    const cpfArray = Array.from(partialCPF);

    let regressiveCounter = cpfArray.length + 1;
    const total = cpfArray.reduce((acc, val) => {
        console.log(`Acc: ${acc} | Val: ${val} | Reg: ${regressiveCounter}`)
        acc += (regressiveCounter * Number(val));
        regressiveCounter--;
        return acc;
    }, 0);

    console.log(total)
    console.log(total % 11)

    const digit = (11 - (total % 11));
    return (digit > 9) ? '0' : String(digit);
};

ValidateCPF.prototype.isSequence = function () {
    if (!this.cleanCPF || this.cleanCPF.length === 0) return false;
    return this.cleanCPF[0].repeat(this.cleanCPF.length) === this.cleanCPF;
}

const cpf = new ValidateCPF('000.000.000-00');
if (cpf.validate()) {
    console.log('Valid CPF');
} else {
    console.log('Invalid CPF');
}