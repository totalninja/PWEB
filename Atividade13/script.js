const imagemJanela = document.getElementById('imagem-janela');
const estadoJanela = document.getElementById('estado-janela');

function alterarJanela(src, texto) {
    imagemJanela.src = src;
    estadoJanela.textContent = texto;
}

imagemJanela.onmouseover = () => alterarJanela('img/aberta.jpg', 'Janela Aberta');
imagemJanela.onmouseout = () => alterarJanela('img/fechada.jpg', 'Janela Fechada');
imagemJanela.onclick = () => alterarJanela('img/quebrada.jpg', 'Janela Quebrada');
