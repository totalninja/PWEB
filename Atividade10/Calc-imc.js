function calcularIMC() {
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const resultado = document.getElementById('resultado');

    if (altura > 0 && peso > 0) {
        const imc = (peso / (altura * altura)).toFixed(2);
        let classificacao = '';

        if (imc < 18.5) classificacao = 'Magreza';
        else if (imc < 25) classificacao = 'Normal';
        else if (imc < 30) classificacao = 'Sobrepeso';
        else if (imc < 40) classificacao = 'Obesidade';
        else classificacao = 'Obesidade Grave';

        resultado.innerHTML = `IMC: ${imc}<br>Classificação: ${classificacao}`;
    } else {
        resultado.innerHTML = 'Insira valores válidos.';
    }
}