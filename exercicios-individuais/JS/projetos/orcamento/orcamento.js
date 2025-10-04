document.querySelector('.seu-nome').textContent = "Lucas Henrique Vicente dos Santos";

const PRECO_POR_PAGINA = 500; // Quando for fazer o calculo da regra de negócio é para chamar essas duas variáveis
const PRECO_DESIGN_ADICIONAL = 1000; // Quando for fazer o calculo da regra de negócio é para chamar essas duas variáveis

// 1º Passo: Mapear todos os botoões que serão manipulados no site (9 botões no total, eles são coletados através do ID ou da Classe dos inputs)
const inputPaginas = document.querySelector("#qtd-paginas");
const inputPrazo = document.querySelector("#prazo-entrega");
const inputDesconto = document.querySelector("#desconto");
const checkBoxDesign = document.querySelector("#inclui-design"); // É um CheckBox, porém segue o mesmo padrão do resto dos botões
const resumoSubtotal = document.querySelector("#resumo-subtotal");
const resumoAdicional = document.querySelector("#resumo-adicional");
const resumoUrgencia = document.querySelector("#resumo-urgencia");
const resumoDesconto = document.querySelector("#resumo-desconto");
const resumoTotal = document.querySelector("#resumo-total");

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

// 3º Passo: 
function atualizarOrcamento() { // Calculando o orçamento total do cliente
    const qtdPaginas = Number(inputPaginas.value); // Pegando o campo de quantidade de páginas 
    const porcentagemDesconto = Number(inputDesconto.value); // Pegando o campo da porcentagem de desconto
    const prazo = Number(inputPrazo.value); // Pegando o campo do prazo de dias
    const designincluido = checkBoxDesign.checked; // Retorna se estiver ativado True e caso não estiver returna um Falso

    const subtotal = caclcularSubtotal(qtdPaginas);
    const adicionalDesign = designincluido ? PRECO_DESIGN_ADICIONAL : 0; // Fazendo de modo ternário a verificação se o design do projeto está incluído ou não
}