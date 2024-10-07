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
  
  // Conta quantos símbolos são encontrados na string
  const posicoesSimbolos = [];
    
    // Percorre a string e armazena as posições dos símbolos encontrados
    for (let i = 0; i < semEspacos.length; i++) {
        if (simbolos.includes(semEspacos[i])) {
            posicoesSimbolos.push(i);
        }
    }
    
    const totalSimbolosEncontrados = posicoesSimbolos.length;
  
  // Gera todas as combinações possíveis
  const totalCombinacoes = 1 << totalSimbolosEncontrados; // 2^totalSimbolosEncontrados

  for (let i = 0; i < totalCombinacoes; i++) {
      const copiaArray = Array.from(semEspacos);
      
      // Substitui de acordo com a combinação
      for (let j = 0; j < totalSimbolosEncontrados; j++) {
        if (i & (1 << j)) { // Verifica se o bit j está setado
            const posicao = posicoesSimbolos[j];
            copiaArray[posicao] = '0'; // Substitui o símbolo por '0'
        }
      }

      // Transforma a cópia em uma string e adiciona ao array de resultados
      resultados.push(copiaArray.join(''));
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












