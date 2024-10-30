let janelaCursoAberta = null; // Armazena a referência da última janela aberta

function abrirCurso() {
    const selecaoCurso = document.getElementById("selecao-curso");
    const valorCurso = selecaoCurso.value;
    const tituloCurso = selecaoCurso.options[selecaoCurso.selectedIndex].text;

    if (valorCurso) {
        // Confirmação para abrir o Pop Up
        const confirmar = confirm("Deseja abrir informações sobre o curso selecionado?");
        if (!confirmar) return;

        let conteudo = "";

        switch (valorCurso) {
            case "ADS":
                conteudo = "<h2>Análise e Desenvolvimento de Sistemas</h2><p>O tecnólogo em Análise e Desenvolvimento de Sistemas analisa, projeta, documenta, especifica, testa, implanta e mantém sistemas computacionais de informação...</p><p>Coordenação: Profº Me. Antonio Cesar de Barros Munari<br>Email: f003.ads@fatec.sp.gov.br</p>";
                break;
            case "Fabricacao":
                conteudo = "<h2>Fabricação Mecânica</h2><p>O tecnólogo em Fabricação Mecânica atua no segmento de fabricação, envolvendo usinagem, conformação, soldagem, montagem e outros processos mecânicos...</p><p>Coordenação: Profº Me. Amilton Cordeiro de Freitas<br>Email: f003fmec@fatec.sp.gov.br</p>";
                break;
            case "GestaoEmp":
                conteudo = "<h2>Gestão Empresarial - Ensino a Distância</h2><p>O Tecnólogo em Gestão Empresarial elabora e implementa planos de negócios, utilizando métodos e técnicas de gestão...</p>";
                break;
            case "Qualidade":
                conteudo = "<h2>Gestão da Qualidade</h2><p>O Tecnólogo em Gestão da Qualidade será um profissional que planeja, implementa e audita sistemas de gestão da qualidade...</p><p>Coordenação: Profº Dr. Délvio Venanzi<br>Email: f003.qualidade@fatec.sp.gov.br</p>";
                break;
            case "Logistica":
                conteudo = "<h2>Logística</h2><p>O tecnólogo em Logística é o profissional especializado em armazenagem, distribuição e transporte...</p><p>Coordenação: Prof Me. Marcos Lopes<br>Email: f003.logistica@fatec.sp.gov.br</p>";
                break;
            case "Manufatura":
                conteudo = "<h2>Manufatura Avançada</h2><p>O aluno aprenderá a transformar ambientes de manufatura convencional em ambientes mais tecnológicos...</p><p>Coordenação: Prof. Me. Samuel Mendes Franco<br>Email: f003.mava@fatec.sp.gov.br</p>";
                break;
            case "Metalurgia":
                conteudo = "<h2>Processos Metalúrgicos</h2><p>O tecnólogo em Processos Metalúrgicos utiliza os fenômenos envolvidos em processos como: tratamentos térmicos, fundição...</p><p>Coordenação: Prof. Me. Igor Pereira Franco<br>Email: f003.metal@fatec.sp.gov.br</p>";
                break;
            case "Polimeros":
                conteudo = "<h2>Polímeros</h2><p>Esse profissional trabalha na fabricação dos Polímeros, compostos químicos utilizados na fabricação de produtos como o plástico...</p><p>Coordenação: Profª Ma. Cécile Chaves Hernandez Garcia<br>Email: f003.polimeros@fatec.sp.gov.br</p>";
                break;
            case "ProjetosMecanicos":
                conteudo = "<h2>Projetos Mecânicos</h2><p>O tecnólogo em Projetos Mecânicos está habilitado a realizar projetos, com detalhamento técnico de sistemas mecânicos...</p><p>Coordenação: Prof. Dr. José Carlos Moura<br>Email: f003.pmec@fatec.sp.gov.br</p>";
                break;
            case "Biomedicos":
                conteudo = "<h2>Sistemas Biomédicos</h2><p>O tecnólogo em Sistemas Biomédicos é responsável por planejar, gerenciar, implantar e manter equipamentos clínicos e médico-hospitalares...</p><p>Coordenação: Profª Me. Joseli Vergara Marins<br>Email: f003.biomedicos@fatec.sp.gov.br</p>";
                break;
            case "Automotiva":
                conteudo = "<h2>Eletrônica Automotiva</h2><p>O tecnólogo em Eletrônica Automotiva participa de equipes de desenvolvimento de novos produtos, novas tecnologias e subsistemas na área automotiva...</p><p>Coordenação: Prof. Me. Fernando César Miranda<br>Email: f003.automotiva@fatec.sp.gov.br</p>";
                break;
        }

        // Fecha a janela anterior, se houver uma aberta
        if (janelaCursoAberta && !janelaCursoAberta.closed) {
            janelaCursoAberta.close();
        }

        // Abre uma nova janela e salva a referência
        janelaCursoAberta = window.open("", tituloCurso, "width=600,height=300");
        janelaCursoAberta.document.write("<html><head><title>" + tituloCurso + "</title></head><body>" + conteudo + "</body></html>");
        janelaCursoAberta.document.close();
        janelaCursoAberta.focus();
    }
}
