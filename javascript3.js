function gerarExpressao() {
    const operadores = ['+', '-', '*', '/'];
    const gerarNumero = () => Math.floor(Math.random() * 10) + 1;
    const gerarOperador = () => operadores[Math.floor(Math.random() * operadores.length)];

    // Gera uma subexpressão com parênteses, colchetes e chaves
    let parteParenteses = `(${gerarNumero()} ${gerarOperador()} ${gerarNumero()})`;
    let parteColchetes = `[${gerarNumero()} ${gerarOperador()} ${parteParenteses}]`;
    let parteChaves = `{${gerarNumero()} ${gerarOperador()} ${parteColchetes}}`;

    return parteChaves;
}


const simbolos = ['+', '-', '*', '/'];

function isNumber(char) {
    return /\d/.test(char) || (char === '-' && /^\d*$/.test(char));
}

function cleanOperand(operand) {
    // Remove parênteses, colchetes e chaves das extremidades do operando
    return operand.replace(/[(){}\[\]]/g, '');
}

function resolveOperation(left, operator, right) {

    // Limpa os operandos antes de fazer a operação
    left = cleanOperand(left);
    right = cleanOperand(right);
    
    // Converte para número (pode adicionar parseFloat se necessário)
    left = parseFloat(left);
    right = parseFloat(right);

    switch (operator) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '*':
            return left * right;
        case '/':
            return right !== 0 ? left / right : null; // Verifica divisão por zero
        default:
            return null;
    }
}

function isIsolatedNumber(chars, index) {
    const leftChar = chars[index - 1];
    const rightChar = chars[index + 1];

    // Verifica se o caractere à esquerda é um bracket
    if (leftChar === '{' || leftChar === '[' || leftChar === '(') {
        return rightChar === '}' || rightChar === ']' || rightChar === ')';
    }

    // Se o caractere à esquerda não é um bracket, mas é um número, verifique antes
    if (isNumber(leftChar)) {
        let prevChar = chars[index - 2];
        if (prevChar && !isNumber(prevChar)) {
            if (prevChar === '{' || prevChar === '[' || prevChar === '(') {
                return rightChar === '}' || rightChar === ']' || rightChar === ')';
            }
        }
    }

    // Verifica se o caractere à direita é um bracket
    if (rightChar === '}' || rightChar === ']' || rightChar === ')') {
        return leftChar === '{' || leftChar === '[' || leftChar === '(';
    }

    // Se o caractere à direita não é um bracket, mas é um número, verifique depois
    if (isNumber(rightChar)) {
        let nextChar = chars[index + 2];
        if (nextChar && !isNumber(nextChar)) {
            if (nextChar === '}' || nextChar === ']' || nextChar === ')') {
                return leftChar === '{' || leftChar === '[' || leftChar === '(';
            }
        }
    }

    return false; // Se não é isolado
}

function isOperator(char) {
    return simbolos.includes(char);
}

function findLeftOperand(chars, index, posicoesSimbolos) {
    let left = '';
    let k = index - 1;
    let opened = 0; 
    let operatorFound = false;

    while (k >= 0) {
        const char = chars[k];

        if (char === ')' || char === ']' || char === '}') {
            opened++;
        } 

        if (char === '(' || char === '[' || char === '{') {
            opened--;
        }

        // Se encontrar um operador diferente de '-', interrompe a busca
        if (isOperator(char)) {
            if (char === '-' && !posicoesSimbolos.includes(k)) {
                // Se for '-', inclui no operando e para
                left = char + left;

            }
            operatorFound = true;
            break;
        }

        left = char + left;
        k--;
    }

    // Retorna o operando encontrado e o índice para continuar a partir daí
    return { operand: left, index: k + 1 };
}

function findRightOperand(chars, index) {
    let right = '';
    let l = index + 1;
    let opened = 0; 
    let operatorFound = false;

    while (l < chars.length) {
        const char = chars[l];

        if (char === '(' || char === '[' || char === '{') {
            opened++;
        } 

        if (char === ')' || char === ']' || char === '}') {
            opened--;
        }

        // Permitir que o sinal de menos faça parte do número
        if (isOperator(char) && char !== '-') {
            operatorFound = true;
            break;
        }

        right += char;
        l++;
    }

    if (operatorFound && opened > 0) {
        return { operand: '', index: index };
    }

    return { operand: right, index: l };
}




function generateSteps(str) {
    const semEspacos = str;
    const resultados = [];
    
    // Conta quantos símbolos são encontrados na string
    const posicoesSimbolos = [];
    
    // Percorre a string e armazena as posições dos símbolos encontrados
    for (let i = 0; i < semEspacos.length; i++) {
        if (isOperator(semEspacos[i])) {
            posicoesSimbolos.push(i);
        }
    }


    const totalSimbolosEncontrados = posicoesSimbolos.length;

    // Se não há mais símbolos, não há mais operações para resolver
    if (totalSimbolosEncontrados === 0) {
        return []; // Retorna um array vazio para indicar o fim
    }

    // Gera todas as combinações possíveis
    const totalCombinacoes = 1 << totalSimbolosEncontrados; // 2^totalSimbolosEncontrados

    for (let i = 0; i < totalCombinacoes; i++) {
        const copiaArray = Array.from(semEspacos);

        // Substitui de acordo com a combinação
        for (let j = 0; j < totalSimbolosEncontrados; j++) {
            if (i & (1 << j)) { // Verifica se o bit j está setado
                const posicao = posicoesSimbolos[j];

                // Verificar números ao redor do operador e resolver operação
                const leftData = findLeftOperand(copiaArray, posicao, posicoesSimbolos);
                const rightData = findRightOperand(copiaArray, posicao);

                const left = leftData.operand;
                const right = rightData.operand;

                //console.log (right);

                if (left && right) {
                    
                        const result = resolveOperation(left, copiaArray[posicao], right);
                    
                    

                    // Preenche os índices dos caracteres utilizados na operação com vazios ('')
                    for (let k = leftData.index; k <= rightData.index; k++) {
                        copiaArray[k] = ''; // Esvazia os índices
                    }

                    // Insere o resultado da operação nos índices esvaziados
                    
                    copiaArray[leftData.index] = result.toString();
                    
                
                }
            }
        }
        
        // Transforma a cópia em uma string e adiciona ao array de resultados
        resultados.push(copiaArray.join(''));
    }

    return resultados;
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function waitForEnter() {
    return new Promise((resolve) => {
        rl.question('Pressione Enter para continuar...', () => {
            resolve();
        });
    });
}

function recursiveSteps(expression) {
    let currentExpression = expression;
    let steps = [currentExpression];


    while (simbolos.some(simbolo => currentExpression.includes(simbolo))) {
        const newStep = generateSteps(currentExpression);
        
        if (newStep.length > 0) {
            currentExpression = newStep[newStep.length - 1];

            const remainingOperators = currentExpression.split('').filter(char => isOperator(char)).length;

            
         // Pega a última forma gerada
            steps.push(currentExpression);

            if (remainingOperators === 1) {
                const operatorIndex = currentExpression.split('').findIndex(char => isOperator(char));

                const leftData = findLeftOperand(currentExpression.split(''), operatorIndex, []);
                const rightData = findRightOperand(currentExpression.split(''), operatorIndex);

                // Se não houver left ou right, quebramos o ciclo
                if (!leftData.operand || !rightData.operand) {
                    break;
                }
            }
        } else {
            break;
        }
    }

    rl.close();

    return steps;
}

// Exemplo de uso
let expressao = gerarExpressao();
let resultado = recursiveSteps(expressao);

// Exibindo os passos
console.log("Expressão original:", expressao);
console.log(resultado);