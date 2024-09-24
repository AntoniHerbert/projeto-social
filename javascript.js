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

const resolverOperacao = (expr, idxOp) => {
    const operadores = ["+", "-", "*", "/"];
    const operador = expr[idxOp];

    // Usando expressão regular para capturar números antes e depois do operador
    const regex = /(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)/;
    const matchAntes = expr.slice(0, idxOp).match(/(\d+(\.\d+)?)(\s*[\+\-\*\/]\s*\d+(\.\d+)?)*$/);
    const matchDepois = expr.slice(idxOp + 1).match(/^(\s*[\+\-\*\/]\s*\d+(\.\d+)?)+/);

    // Extraindo os números antes e depois do operador
    const numEsquerda = matchAntes ? matchAntes[1] : null;
    const numDireita = matchDepois ? matchDepois[0].trim().split(' ')[1] : null;

    // Verifica se ambos os números são válidos
    if (numEsquerda && numDireita) {
        const resultado = eval(`${numEsquerda} ${operador} ${numDireita}`);
        // Substitui a operação resolvida pela expressão com o resultado
        return expr.slice(0, matchAntes.index) + resultado + expr.slice(idxOp + 1 + matchDepois[0].length);
    } else {
        console.log(`Operação inválida: ${numEsquerda} ${operador} ${numDireita}`);
        return null; // Retorna null para indicar que a operação não foi realizada
    }
};

// Função principal que percorre a expressão e gera as próximas etapas
const corrigirExpressao = (expressao) => {
    let passos = [];
    let passoAtual = [expressao];

    let limitePassos = 100; // Define um limite de passos para evitar loops infinitos
    let passo = 0;

    while (passo < limitePassos) {
        let novasExpressoes = [];

        // Percorre cada expressão do passo atual
        for (let expr of passoAtual) {
            const operadores = ["+", "-", "*", "/"];

            // Encontra os operadores na expressão
            for (let i = 0; i < expr.length; i++) {
                if (operadores.includes(expr[i])) {
                    let novaExpr = resolverOperacao(expr, i);
                    if (novaExpr !== null) { // Apenas adiciona expressões válidas
                        novasExpressoes.push(novaExpr); // Adiciona a expressão resultante
                    }
                }
            }
        }

        // Se não houver novas expressões, interrompe o loop
        if (novasExpressoes.length === 0) {
            break;
        }

        passos.push(novasExpressoes);
        passoAtual = novasExpressoes;
        passo++;
    }

    return passos;
};
   

// Exemplo de uso
let expressao = gerarExpressao();
let resultado = corrigirExpressao(expressao);

// Exibindo os passos
console.log("Expressão original:", expressao);
resultado.forEach((passo, idx) => {
    console.log(`Passo ${idx}:`, passo);
});












