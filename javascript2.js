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
    return operand.replace(/[(){}\[\]]/g, '');
}

function resolveOperation(left, operator, right) {
    console.log(left);
    console.log(right)

    console.log("");

    // Limpa os operandos antes de fazer a operação
    left = cleanOperand(left);
    right = cleanOperand(right);

    console.log(left);
    console.log(right);
    console.log("");
    
    // Converte para número (pode adicionar parseFloat se necessário)
    left = parseFloat(left);
    right = parseFloat(right);

    if (operator === '-' && left < 0 && right < 0) {
        right = -right; // Converte o segundo negativo em positivo
    }

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

function findLeftOperand(chars, index) {
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

        // Permitir que o sinal de menos faça parte do número
        if (isOperator(char)) {
            if (char === '-') {
                // Se for '-', inclui no operando e para
                left = char + left;
            }
            operatorFound = true;
            break;
        }

        left = char + left;
        k--;
    }

    if (operatorFound && opened > 0) {
        return { operand: '', index: index };
    }

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

function isIsolatedNumber(chars) {
    let cleanedChars = Array.from(chars); // Cria uma cópia da string em array
    let modified = false; // Flag para saber se foi modificada

    for (let i = 0; i < cleanedChars.length; i++) {
        // Verifica se o caractere é um delimitador de agrupamento (parêntese, colchete ou chave)
        if (cleanedChars[i] === '(' || cleanedChars[i] === '[' || cleanedChars[i] === '{') {
            let open = cleanedChars[i];
            let close;
            
            // Determina o tipo de fechamento correspondente
            if (open === '(') close = ')';
            else if (open === '[') close = ']';
            else if (open === '{') close = '}';

            let j = i + 1; // Começa a verificar o conteúdo após o delimitador de abertura
            let number = '';
            let foundClose = false;
            
            // Percorre a expressão até encontrar o delimitador de fechamento correspondente
            while (j < cleanedChars.length) {
                if (cleanedChars[j] === close) {
                    foundClose = true;
                    break;
                }
                number += cleanedChars[j]; // Coleta os caracteres entre o delimitador
                j++;
            }

            // Se foi encontrado o fechamento e há apenas um número entre os delimitadores
            if (foundClose && isNumber(number.trim())) {
                // Remove o agrupamento e deixa apenas o número
                cleanedChars.splice(i, (j - i) + 1, number.trim());
                modified = true;
            }
        }
    }

    return { cleanedChars: cleanedChars.join(''), modified };
}



function generateSteps(str) {
    let semEspacos = str.replace(/\s+/g, '');
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
                const leftData = findLeftOperand(copiaArray, posicao);
                const rightData = findRightOperand(copiaArray, posicao);

                //console.log(leftData);
                //console.log(rightData);

                const left = leftData.operand;
                const right = rightData.operand;

                //console.log("");

                if (left && right) {
                    const result = resolveOperation(left, copiaArray[posicao], right);
                    copiaArray.splice(leftData.index + 1, rightData.index - leftData.index, result.toString()); // Substitui pela operação resolvida
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

async function recursiveSteps(expression) {
    let currentExpression = expression.replace(/\s+/g, '');
    let steps = [currentExpression];

    while (simbolos.some(simbolo => currentExpression.includes(simbolo))) {
        const newStep = generateSteps(currentExpression);
        if (newStep.length > 0) {
            currentExpression = newStep[newStep.length - 1]; // Pega a última forma gerada
            steps.push(currentExpression);
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