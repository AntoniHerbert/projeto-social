// Importar a biblioteca readline para entrada do usuário no Node.js
const readline = require('readline');

// Configurar a interface para entrada de dados
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Classe Numero
class Numero {
  constructor(valor, sinal) {
    this.valor = valor;
    this.sinal = sinal;
  }

  toString() {
    return `${this.sinal}${this.valor}`;
  }
}

// Classe Fracao
class Fracao {
  constructor(numerador, denominador) {
    this.numerador = numerador;
    this.denominador = denominador;
  }

  toString() {
    return `${this.numerador}/${this.denominador}`;
  }
}

// Classe Operador
class Operador {
  constructor(esquerda, direita, tipo) {
    this.esquerda = esquerda;
    this.direita = direita;
    this.tipo = tipo;
  }

  toString() {
    return `${this.esquerda} ${this.tipo} ${this.direita}`;
  }
}

// Função para gerar números aleatórios
function gerarNumeroAleatorio() {
  const valor = Math.floor(Math.random() * 101);  // Valor de 0 a 100
  const sinal = '+';  // Sempre será positivo
  return new Numero(valor, sinal);
}

// Função para gerar uma fração a partir de dois números
function gerarFracao(numerador, denominador) {
  return new Fracao(numerador.valor, denominador.valor);
}

// Função para gerar um operador com tipos diferentes (+, -, *, /)
function gerarOperador(esquerda, direita) {
  const operadores = ['+', '-', '*', '/'];
  const tipo = operadores[Math.floor(Math.random() * operadores.length)];
  return new Operador(esquerda.toString(), direita.toString(), tipo);
}

// Função para gerar uma operação
function gerarOperacao() {
  // Gerando 4 números aleatórios
  const numeros = [];
  for (let i = 0; i < 4; i++) {
    numeros.push(gerarNumeroAleatorio());
  }

  // Instanciando duas frações
  const fracao1 = gerarFracao(numeros[0], numeros[1]);
  const fracao2 = gerarFracao(numeros[2], numeros[3]);

  // Gerando um operador com tipo aleatório
  const operador = gerarOperador(fracao1, fracao2);

  // Retornando o array com a operação: [fração1, operador, fração2]
  return [fracao1, operador, fracao2];
}

// Função para operar as frações, avaliar o input e mostrar o resultado
function operar(operacao) {
    const [fracao1, operador, fracao2] = operacao;
  
    // Exibir a operação
    console.log("Operação:");
    console.log(`${fracao1.toString()} ${operador.tipo} ${fracao2.toString()}`);
  
    // Função auxiliar para perguntar e avaliar o input do usuário
    const perguntarInput = (mensagem) => {
      return new Promise((resolve) => {
        rl.question(mensagem, (input) => {
          resolve(parseInt(input));
        });
      });
    };
  
    // Se o operador for de multiplicação (*)
    if (operador.tipo === '*') {
      const numeradorResultado = fracao1.numerador * fracao2.numerador;
      const denominadorResultado = fracao1.denominador * fracao2.denominador;
  
      perguntarInput(`Qual é o resultado do numerador (${fracao1.numerador} * ${fracao2.numerador})? `)
        .then((inputNumerador) => {
          if (inputNumerador === numeradorResultado) {
            console.log("Numerador correto!");
            return perguntarInput(`Qual é o resultado do denominador (${fracao1.denominador} * ${fracao2.denominador})? `);
          } else {
            console.log(`Numerador incorreto. O correto seria: ${numeradorResultado}`);
            rl.close();
            return Promise.reject();
          }
        })
        .then((inputDenominador) => {
          if (inputDenominador === denominadorResultado) {
            console.log("Denominador correto!");
  
            // Se ambos os inputs estiverem corretos, criar uma nova fração
            const novaFracao = new Fracao(numeradorResultado, denominadorResultado);
            console.log("Resultado da multiplicação:");
            console.log(novaFracao.toString());
          } else {
            console.log(`Denominador incorreto. O correto seria: ${denominadorResultado}`);
          }
          rl.close();
        })
        .catch(() => {
          console.log("Operação encerrada.");
        });
  
    // Se o operador for de divisão (/)
    } else if (operador.tipo === '/') {
      const numeradorResultado = fracao1.numerador * fracao2.denominador;
      const denominadorResultado = fracao1.denominador * fracao2.numerador;
  
      perguntarInput(`Qual é o resultado do numerador (${fracao1.numerador} * ${fracao2.denominador})? `)
        .then((inputNumerador) => {
          if (inputNumerador === numeradorResultado) {
            console.log("Numerador correto!");
            return perguntarInput(`Qual é o resultado do denominador (${fracao1.denominador} * ${fracao2.numerador})? `);
          } else {
            console.log(`Numerador incorreto. O correto seria: ${numeradorResultado}`);
            rl.close();
            return Promise.reject();
          }
        })
        .then((inputDenominador) => {
          if (inputDenominador === denominadorResultado) {
            console.log("Denominador correto!");
  
            // Se ambos os inputs estiverem corretos, criar uma nova fração
            const novaFracao = new Fracao(numeradorResultado, denominadorResultado);
            console.log("Resultado da divisão:");
            console.log(novaFracao.toString());
          } else {
            console.log(`Denominador incorreto. O correto seria: ${denominadorResultado}`);
          }
          rl.close();
        })
        .catch(() => {
          console.log("Operação encerrada.");
        });
  
    // Se o operador for de soma (+)
    }  else if (operador.tipo === '+') {
        const numerador1 = fracao1.numerador * fracao2.denominador;
        const numerador2 = fracao2.numerador * fracao1.denominador;
        const denominadorResultadoIntermediario = fracao1.denominador * fracao2.denominador;
      
        // Perguntar o resultado das operações para o numerador
        perguntarInput(`Qual é o resultado do numerador 1 (${fracao1.numerador} * ${fracao2.denominador})? `)
          .then((inputNumerador1) => {
            if (parseInt(inputNumerador1) === numerador1) {
              console.log("Resultado do numerador 1 correto!");
              return perguntarInput(`Qual é o resultado do numerador 2 (${fracao2.numerador} * ${fracao1.denominador})? `);
            } else {
              console.log(`Resultado do numerador 1 incorreto. O correto seria: ${numerador1}`);
              rl.close();
              return Promise.reject();
            }
          })
          .then((inputNumerador2) => {
            if (parseInt(inputNumerador2) === numerador2) {
              console.log("Resultado do numerador 2 correto!");
      
              // Perguntar o resultado do denominador
              return perguntarInput(`Qual é o resultado do denominador (${fracao1.denominador} * ${fracao2.denominador})? `)
                .then((inputDenominadorIntermediario) => {
                  if (parseInt(inputDenominadorIntermediario) === denominadorResultadoIntermediario) {
                    console.log("Denominador intermediário correto!");
      
                    // Mostrar a fração intermediária com a soma não resolvida
                    const fracaoIntermediaria = new Fracao(`${numerador1} + ${numerador2}`, denominadorResultadoIntermediario);
                    console.log("Fração intermediária:");
                    console.log(fracaoIntermediaria.toString());
      
                    // Perguntar o resultado final da soma
                    return perguntarInput(`Qual é o resultado final da soma (${numerador1} + ${numerador2})? `);
                  } else {
                    console.log(`Denominador intermediário incorreto. O correto seria: ${denominadorResultadoIntermediario}`);
                    rl.close();
                    return Promise.reject();
                  }
                });
            } else {
              console.log(`Resultado do numerador 2 incorreto. O correto seria: ${numerador2}`);
              rl.close();
              return Promise.reject();
            }
          })
          .then((inputNumeradorFinal) => {
            // Calcular o numerador final
            const numeradorFinal = numerador1 + numerador2; // Cálculo correto do numerador
            const denominadorFinal = denominadorResultadoIntermediario; // Denominador final já é conhecido
            if (parseInt(inputNumeradorFinal) === numeradorFinal) {
              console.log("Resultado correto da soma!");
              const fracaoFinal = new Fracao(numeradorFinal, denominadorFinal);
              console.log("Resultado final da soma:");
              console.log(fracaoFinal.toString());
            } else {
              console.log(`Resultado final incorreto. O correto seria: ${numeradorFinal}`);
            }
            rl.close();
          })
          .catch(() => {
            console.log("Operação encerrada.");
          });
  
    // Se o operador for de subtração (-)
    } else if (operador.tipo === '-') {
        const numerador1 = fracao1.numerador * fracao2.denominador;
        const numerador2 = fracao2.numerador * fracao1.denominador;
        const denominadorResultado = fracao1.denominador * fracao2.denominador;
      
        // Perguntar o resultado das operações para o numerador
        perguntarInput(`Qual é o resultado do numerador 1 (${fracao1.numerador} * ${fracao2.denominador})? `)
          .then((inputNumerador1) => {
            if (parseInt(inputNumerador1) === numerador1) {
              console.log("Resultado do numerador 1 correto!");
              return perguntarInput(`Qual é o resultado do numerador 2 (${fracao2.numerador} * ${fracao1.denominador})? `);
            } else {
              console.log(`Resultado do numerador 1 incorreto. O correto seria: ${numerador1}`);
              rl.close();
              return Promise.reject();
            }
          })
          .then((inputNumerador2) => {
            if (parseInt(inputNumerador2) === numerador2) {
              console.log("Resultado do numerador 2 correto!");
      
              // Perguntar o resultado do denominador
              return perguntarInput(`Qual é o resultado do denominador (${fracao1.denominador} * ${fracao2.denominador})? `)
                .then((inputDenominador) => {
                  if (parseInt(inputDenominador) === denominadorResultado) {
                    console.log("Denominador correto!");
      
                    // Mostrar a fração intermediária com a subtração não resolvida
                    const fracaoIntermediaria = new Fracao(`${numerador1} - ${numerador2}`, denominadorResultado);
                    console.log("Fração intermediária:");
                    console.log(fracaoIntermediaria.toString());
      
                    // Perguntar o resultado final da subtração
                    return perguntarInput(`Qual é o resultado final da subtração (${numerador1} - ${numerador2})? `);
                  } else {
                    console.log(`Denominador incorreto. O correto seria: ${denominadorResultado}`);
                    rl.close();
                    return Promise.reject();
                  }
                });
            } else {
              console.log(`Resultado do numerador 2 incorreto. O correto seria: ${numerador2}`);
              rl.close();
              return Promise.reject();
            }
          })
          .then((inputNumeradorFinal) => {
            // Calcular o numerador final
            const numeradorFinal = numerador1 - numerador2; // Cálculo correto do numerador
            const denominadorFinal = denominadorResultado; // Denominador final já é conhecido
            if (parseInt(inputNumeradorFinal) === numeradorFinal) {
              console.log("Resultado correto da subtração!");
              const fracaoFinal = new Fracao(numeradorFinal, denominadorFinal);
              console.log("Resultado final da subtração:");
              console.log(fracaoFinal.toString());
            } else {
              console.log(`Resultado final incorreto. O correto seria: ${numeradorFinal}`);
            }
            rl.close();
        })
        .catch(() => {
          console.log("Operação encerrada.");
        });
  
    } else {
      console.log("Operação não suportada.");
      rl.close();
    }
  }
  
// Exemplo de uso
const operacao = gerarOperacao();
operar(operacao);
