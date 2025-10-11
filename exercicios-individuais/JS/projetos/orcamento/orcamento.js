document.querySelector('.seu-nome').textContent = "Lucas Henrique Vicente dos Santos"; // Definindo o resto do texto do rodapé pelo JavaScript

const PRECO_POR_PAGINA = 500; // Quando for fazer o calculo da regra de negócio é para chamar essas duas variáveis
const PRECO_DESIGN_ADICIONAL = 1000; // Quando for fazer o calculo da regra de negócio é para chamar essas duas variáveis

// 1º Passo: Mapear todos os botoões que serão manipulados no site (9 botões no total, eles são coletados através do ID ou da Classe dos inputs)
const inputPaginas = document.querySelector("#qtd-paginas");
const inputPrazo = document.querySelector("#prazo-entrega");
const inputDesconto = document.querySelector("#desconto");
const inputMensalidade = document.querySelector("#mensalidade");
const checkBoxDesign = document.querySelector("#inclui-design"); // É um CheckBox, porém segue o mesmo padrão do resto dos botões

// Pegando o resumo de todos os valores
const resumoSubtotal = document.querySelector("#resumo-subtotal");
const resumoAdicional = document.querySelector("#resumo-adicional");
const resumoUrgencia = document.querySelector("#resumo-urgencia");
const resumoDesconto = document.querySelector("#resumo-desconto");
const resumoTotal = document.querySelector("#resumo-total");
const resumoMensalidade = document.querySelector("#resumo-mensalidade");

// 2º Passo: realizar as operações através das funções de acordo com as regras de negócio do sistema
const caclcularSubtotal = (quantidade) => quantidade * PRECO_POR_PAGINA; // Calculando o preço por página

const calcularValorDesconto = (valor, porcentagem) => valor * (porcentagem / 100); // Calculando o valor de desconto 

function calcularTaxaDeUrgencia(valor, prazo) { // Calculando a taxa de urgência de acordo com a quantidade de dias (prazo) estabelecido pelo cliente

    /* Taxa de Urgência: 
   - Se o prazo for menor que 5 dias: 10% sobre o valor base (páginas + design).
   - Se o prazo for menor que 15 dias: 5% sobre o valor base (páginas + design). 
   - Se for 15 dias ou mais, a taxa é zero. */

    if (prazo > 0 && prazo < 5) {
        return valor * 0.1; // 10%
    }
    else if (prazo >= 5 && prazo < 15) {
        return valor * 0.5; // 5%
    }
    else {
        return 0;
    }
}

const calcularMensalidade = (mensalidade) => mensalidade+= mensalidade;

// 3º Passo: Atualizar todos os dados dos inputs que estão no front-end e calcula-los
function atualizarOrcamento() { // Calculando o orçamento total do cliente
    const qtdPaginas = Number(inputPaginas.value); // Pegando o campo de quantidade de páginas 
    const porcentagemDesconto = Number(inputDesconto.value); // Pegando o campo da porcentagem de desconto
    const prazo = Number(inputPrazo.value); // Pegando o campo do prazo de dias
    const mensalidade = Number(inputMensalidade.value); // Pegando o campo da mensalidade
    const designincluido = checkBoxDesign.checked; // Retorna se estiver ativado True e caso não estiver returna um Falso

    const subtotal = caclcularSubtotal(qtdPaginas);
    const adicionalDesign = designincluido ? PRECO_DESIGN_ADICIONAL : 0; // Fazendo de modo ternário a verificação se o design do projeto está incluído ou não

    const taxaUrgencia = calcularTaxaDeUrgencia((subtotal + adicionalDesign), prazo); // Calculando o subtotal e o adicionalDesgin direto dentro da função e passando o prazo como parâmetro também

    const valorDesconto = calcularValorDesconto((subtotal + adicionalDesign + taxaUrgencia), porcentagemDesconto); // Calculando o subtotal, adicionalDesgin e a taxaUrgencia direto dentro da função e passando o porcentagemDesconto 

    const total = (subtotal + adicionalDesign + taxaUrgencia) - valorDesconto; // Calculando o total de tudo

    const formatarValor = valor => valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) //Formatando o valor dentro do front-end para os campos que possuem valores

    // Mostrando tudo o que foi feito até então (Como se fosse um print na tela)
    resumoSubtotal.textContent = formatarValor(subtotal);
    resumoAdicional.textContent = formatarValor(adicionalDesign);
    resumoUrgencia.textContent = formatarValor(taxaUrgencia);
    resumoDesconto.textContent = formatarValor(valorDesconto);
    resumoTotal.textContent = formatarValor(total);
    resumoMensalidade.textContent = formatarValor(mensalidade); // Calculando a mensalidade
}

// 4º Passo: Chamar e atualizar a parte do total

// inputPaginas.addEventListener('input', atualizarOrcamento);, está correto, porém temos como otimizar esta linha de código

const todosInputs = [inputPaginas, inputPrazo, inputDesconto, checkBoxDesign, inputMensalidade]; // Maneira otimizada

todosInputs.forEach(input => {
    input.addEventListener('input', atualizarOrcamento);
});

document.addEventListener("DOMContentLoaded", atualizarOrcamento);