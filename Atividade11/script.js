let obj = {
    x: 10,
    y: 2,
    z: function () {
        return this.x ** this.y;
    }
};

let funcionario1 = {
    nome: "João",
    funcao: "Desenvolvedor",
    mostrarDados: function () {
        return `${this.nome} - ${this.funcao}`;
    }
};

function Funcionario(nome, funcao) {
    this.nome = nome;
    this.funcao = funcao;
    this.mostrarDados = function () {
        return `${this.nome} - ${this.funcao}`;
    };
}
let funcionario2 = new Funcionario("Maria", "Analista");

let funcionario3 = Object.create(funcionario1);
funcionario3.nome = "Pedro";
funcionario3.funcao = "Gerente";

function mostrarResultadoExponenciacao() {
    document.getElementById('resultado-exp').innerHTML = `Resultado: ${obj.z()}`;
}

function mostrarFuncionario1() {
    document.getElementById('func1').innerHTML = funcionario1.mostrarDados();
}

function mostrarFuncionario2() {
    document.getElementById('func2').innerHTML = funcionario2.mostrarDados();
}

function mostrarFuncionario3() {
    document.getElementById('func3').innerHTML = funcionario3.mostrarDados();
}
