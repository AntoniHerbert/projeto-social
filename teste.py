
import random
import sympy as sp

# Função para gerar uma expressão algébrica
def gerar_expressao():
    x = sp.symbols('x')
    termos = []
    for _ in range(random.randint(2, 5)):  # Gerar entre 2 a 5 termos
        coef = random.randint(1, 10)
        expoente = random.randint(1, 3)
        termo = coef * x**expoente
        termos.append(termo)
    expressao = sum(termos)
    return expressao

# Função para resolver a expressão
def simplificar_expressao(expressao):
    print("Expressão original:", expressao)
    while True:
        simplificada = sp.simplify(expressao)
        print("Simplificada:", simplificada)
        if simplificada == expressao:  # Se não houver mais simplificações
            break
        expressao = simplificada
    return simplificada

# Função para resolver a expressão passo a passo
def resolver_expressao_passos(expressao):
    x = sp.symbols('x')
    
    # Etapa 1: Simplificação inicial
    expressao_simplificada = simplificar_expressao(expressao)

    # Etapa 2: Igualar a zero
    eq = sp.Eq(expressao_simplificada, 0)
    print("Equação:", eq)

    # Etapa 3: Resolver a equação
    solucoes = sp.solve(eq, x)

    # Etapa 4: Mostrar cada passo da solução
    print("Passo a passo da resolução:")
    print("1. Começamos com a equação:", eq)
    print("2. Resolvendo para x, encontramos:", solucoes)

    return solucoes

# Gerar e resolver a expressão
expressao = gerar_expressao()
print("Expressão gerada:", expressao)
solucoes = resolver_expressao_passos(expressao)
print("Soluções:", solucoes)
