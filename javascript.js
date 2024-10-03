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

function generateSteps(str) {
  // Remove todos os espaços em branco
  const semEspacos = str.replace(/\s+/g, '');
    const resultados = [];
    
    // Filtra os símbolos encontrados na string
    const simbolosEncontrados = simbolos.filter(simbolo => semEspacos.includes(simbolo));
    const totalSimbolosEncontrados = simbolosEncontrados.length;

    // Gera todas as combinações possíveis de v e f
    const totalCombinacoes = 1 << totalSimbolosEncontrados; // 2^totalSimbolosEncontrados

    for (let i = 0; i < totalCombinacoes; i++) {
        const copiaArray = Array.from(semEspacos);
        
        // Guarda as posições dos símbolos
        const posicoes = simbolosEncontrados.map(simbolo => {
            return Array.from(copiaArray.keys()).filter(k => copiaArray[k] === simbolo);
        });

        // Substitui de acordo com a tabela verdade
        for (let j = 0; j < totalSimbolosEncontrados; j++) {
            const substitui = (i & (1 << j)) !== 0; // Verifica se o bit j está setado

            if (substitui) {
                const posicoesDoSimbolo = posicoes[j];
                for (let k = 0; k < posicoesDoSimbolo.length; k++) {
                    // Ignora a ocorrência de acordo com a tabela verdade
                    if (k === 0) continue; // Ignora a primeira ocorrência

                    // Substitui pelo índice
                    copiaArray[posicoesDoSimbolo[k]] = j; // Usa o índice do símbolo
                }
            }
        }

        // Transforma a cópia em uma string e adiciona ao array de resultados
        const resultadoFinal = copiaArray.join('');
        if (!resultados.includes(resultadoFinal)) {
            resultados.push(resultadoFinal);
        }
    }

    return resultados;
}
   

// Exemplo de uso
let expressao = gerarExpressao();
let resultado = generateSteps(expressao, simbolos);

// Exibindo os passos
console.log("Expressão original:", expressao);
resultado.forEach((passo, idx) => {
    console.log(`Passo ${idx}:`, passo);
});












