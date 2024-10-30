document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-aluno");
    const resultadosDiv = document.getElementById("resultados");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = formulario.nome.value.trim();
        const ra = formulario.ra.value;
        const notas = [
            parseFloat(formulario.nota1.value),
            parseFloat(formulario.nota2.value),
            parseFloat(formulario.nota3.value),
        ];

        if (!nome || !nome.includes(" ")) {
            alert("Por favor, insira um nome completo.");
            return;
        }

        if (ra.length !== 5 || isNaN(ra)) {
            alert("RA deve conter 5 dígitos.");
            return;
        }

        if (notas.some(nota => isNaN(nota) || nota < 0 || nota > 10)) {
            alert("As notas devem estar entre 0 e 10.");
            return;
        }

        const media = (notas.reduce((soma, nota) => soma + nota, 0) / notas.length).toFixed(2);

        const resultado = document.createElement("p");
        resultado.textContent = `Nome: ${nome}, RA: ${ra}, Média: ${media}`;
        resultadosDiv.appendChild(resultado);

        formulario.reset();
    });
});
