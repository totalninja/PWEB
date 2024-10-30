// 1. Função para encontrar o maior número
function encontrarMaiorNumero() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const num3 = parseFloat(document.getElementById('num3').value);

    const maior = Math.max(num1, num2, num3);
    document.getElementById('resultado1').innerHTML =
        `Números informados: ${num1}, ${num2}, ${num3}<br>Maior número: ${maior}`;
}

// 2. Função para ordenar números em ordem crescente
function ordenarNumeros() {
    const num1 = parseFloat(document.getElementById('ord1').value);
    const num2 = parseFloat(document.getElementById('ord2').value);
    const num3 = parseFloat(document.getElementById('ord3').value);

    const numeros = [num1, num2, num3];
    numeros.sort((a, b) => a - b);
    document.getElementById('resultado2').innerHTML =
        `Números originais: ${num1}, ${num2}, ${num3}<br>Ordem crescente: ${numeros.join(', ')}`;
}

// 3. Função para verificar palíndromo
function verificarPalindromo() {
    const texto = document.getElementById('texto').value;
    const textoProcessado = texto.toUpperCase().replace(/[^A-Z]/g, '');
    const textoInvertido = textoProcessado.split('').reverse().join('');
    const ehPalindromo = textoProcessado === textoInvertido;

    document.getElementById('resultado3').innerHTML =
        `Texto original: ${texto}<br>É palíndromo? ${ehPalindromo ? 'SIM' : 'NÃO'}`;
}

// 4. Função para verificar tipo de triângulo
function verificarTriangulo() {
    const lado1 = parseFloat(document.getElementById('lado1').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);

    let resultado = '';
    if (lado1 + lado2 > lado3 && lado2 + lado3 > lado1 && lado1 + lado3 > lado2) {
        if (lado1 === lado2 && lado2 === lado3) {
            resultado = 'Triângulo Equilátero (todos os lados iguais)';
        } else if (lado1 === lado2 || lado2 === lado3 || lado1 === lado3) {
            resultado = 'Triângulo Isósceles (dois lados iguais)';
        } else {
            resultado = 'Triângulo Escaleno (todos os lados diferentes)';
        }
    } else {
        resultado = 'Os valores informados não formam um triângulo!';
    }

    document.getElementById('resultado4').innerHTML =
        `Lados: ${lado1}, ${lado2}, ${lado3}<br>Resultado: ${resultado}`;
}
