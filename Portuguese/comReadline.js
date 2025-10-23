const readline = require('readline');
class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    isSequence() {
        if(!this.cpfLimpo || this.cpfLimpo.length === 0) return false;
        return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }

    static geraDigito(cpfSemDigitos) {
        let total = 0;
        let regressivo = cpfSemDigitos.length + 1;

        for (let stgNum of cpfSemDigitos) {
            total += regressivo * Number(stgNum);
            regressivo--;
        }

        const digito = 11 - (total % 11);

        return digito <= 9 ? String(digito) : '0';
    }

    geraNovoCPF() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        return (cpfSemDigitos + digito1 + digito2);
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSequence()) return false;
        const novoCPF = this.geraNovoCPF();

        return novoCPF === this.cpfLimpo;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntarCPF() {
    rl.question('Digite o CPF para validar (ou "sair" para fechar): ', (cpfInput) => {
        if (cpfInput.toLowerCase() === 'sair') {
            console.log('Até logo!');
            rl.close();
            return;
        }

        const cpf = new ValidaCPF(cpfInput);

        if (cpf.valida()) {
            console.log(`-> O CPF "${cpfInput}" é VÁLIDO.\n`);
        } else {
            console.log(`-> O CPF "${cpfInput}" é INVÁLIDO.\n`);
        }

        perguntarCPF();
    });
}

console.log('=== Validador de CPF ===');
perguntarCPF();