function validar() {
    const { nome, email, comentario, primeiravez } = document.formulario.elements;

    if (nome.value.length < 10) {
        alert("O nome deve ter pelo menos 10 caracteres.");
        return false;
    }

    if (comentario.value.length < 20) {
        alert("O comentário deve ter pelo menos 20 caracteres.");
        return false;
    }

    const pesquisaSelecionada = Array.from(primeiravez).find(input => input.checked)?.value;

    if (!pesquisaSelecionada) {
        alert("Por favor, responda à pesquisa.");
        return false;
    }

    alert(pesquisaSelecionada === "Não" ?
        "Que legal você regresso a esta página!" :
        "Volte sempre e deposite um pix pra mim Denilce hehe!");

    return true;
}
