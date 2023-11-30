const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt= "Emoji celebrando" />'
const imgReprovado = '<img src="./images/reprovado.png" alt= "Emoji Triste" />'
//vamos criar arrays para reservar o valores das notas para calcular a média final
//toda vez que a função adiciona tabela for executado sera feito um push para adicionar os valores ao arrays.
const atividades = [];
const notas = [];
const spanAprovado = '<span class= "resultado aprovado"> Aprovado </span>'
const spanReprovado = '<span class= "resultado reprovado"> Reprovado </span>'
const mediaFinal = parseFloat(prompt('Digite a nota mínima:'));

//Vamos criar o evento de Submit e remover o evento do formulario de atualizar a tela ao ser submetido.
let linhas = ''; //Linhas precisa estar fora do escopo de submit!


form.addEventListener('submit', function (e) {
    //pra remover o evento de atualizar o formulário usamos
    e.preventDefault();

    adicionaLinha();

    atualizaTabela();

    atualizaMediaFinal();
});


function adicionaLinha() {

    //vamos capturar os campos o nome das atividades e a nota
    const inputNomeAtividade = document.getElementById('nome-atividade'); //atribuir no html esses id's
    const inputNotaAtividade = document.getElementById('nota-atividade'); //atribuir no html esses id's

    //vamos ajustar para que, ao inserir as atividades, os valores se ja submetidos sejam mantidos no corpo da tabela

    //let linhas = ''; dentro do escopo de submit essa variavel vai ser resetada não permitindo que ela armazene novos valores, por isso vai ter que ser movida para fora do escopo do submit na forma global - la pra cima

    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida!`);
    } else {
     //push para os arrays
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));



    //vamos adicionar se o aluno foi aprovado ou não na linha (corpo da tabela) adicionando uma linha
    let linha = '<tr>';

    //isso += é o mesmo que uma concatenação
    //vamos criar a coluna 
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;

    //linha +=  `<td>${inputNotaAtividade.value >= 7 ? 'Aprovado' : 'Reprovado'}</td>`; Ao inves de retornar uma string Aprovado , Reprovado vamos add as variaveis com emojis declarados no topo do projeto.
    linha += `<td>${inputNotaAtividade.value >= mediaFinal ? imgAprovado : imgReprovado}</td>`;
    linha += `</tr>`;

    //vamos concatenar 
    linhas += linha;
    }




    //vamos limpar o campo após inserir uma atividade
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {

    //precisamos colocar dentro do corpo da tabela
    const corpoTabela = document.querySelector('tbody');

    //para inserir um conteudo dentro de uma tag usamos o atributo InnerHtml
    corpoTabela.innerHTML = linhas;
}


function atualizaMediaFinal() {
  
    const MediaFinal = CalculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = MediaFinal;
    document.getElementById('media-final-resultado').innerHTML = MediaFinal >= mediaFinal ? spanAprovado : spanReprovado;

}

function CalculaMediaFinal(){
    
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length
}