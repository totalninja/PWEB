// Função para calcular a área de um retângulo
function calcularArea() {
  const base = document.getElementById("base").value;
  const altura = document.getElementById("altura").value;
  const area = base * altura;
  document.getElementById("resultado-area").textContent = area;
}

// Função para exibir os dados da conta
function mostrarConta() {
  const nome = document.getElementById("nome").value;
  const banco = document.getElementById("banco").value;
  const conta = document.getElementById("conta").value;
  const saldo = document.getElementById("saldo").value;

  document.getElementById("info-conta").textContent = `Nome: ${nome}, Banco: ${banco}, Conta: ${conta}, Saldo: R$ ${saldo}`;
}
