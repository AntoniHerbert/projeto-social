import random
from sympy import symbols, Add, Mul, Div, simplify, parse_expr

def generate_random_expression(variable, max_term_value=10):
    """
    Gera uma expressão algébrica aleatória com uma variável, divisões, parênteses, colchetes e chaves.
    
    :param variable: Variável simbólica.
    :param max_term_value: Valor máximo absoluto para os coeficientes dos termos.
    :return: Expressão algébrica aleatória.
    """
    operators = ['+', '-', '*', '/']
    num_terms = random.randint(1, 4)  # Número aleatório de termos

    def generate_term():
        """Gera um termo aleatório."""
        coef = random.randint(-max_term_value, max_term_value)
        if random.choice([True, False]):
            return coef * variable
        else:
            return coef

    def generate_expression(depth=0):
        """Gera uma expressão aleatória com um nível de profundidade."""
        if depth > 2:
            return generate_term()
        
        expr = generate_term()
        
        for _ in range(random.randint(1, 3)):
            operator = random.choice(operators)
            sub_expr = generate_term() if random.choice([True, False]) else generate_expression(depth + 1)
            expr = parse_expr(f"({expr} {operator} {sub_expr})")
        
        return expr
    
    expression = generate_expression()
    return simplify(expression)

# Defina a variável
x = symbols('x')

# Gere e exiba uma expressão aleatória
random_expression = generate_random_expression(x)
print(f"Expressão algébrica aleatória com uma variável: {random_expression}")
