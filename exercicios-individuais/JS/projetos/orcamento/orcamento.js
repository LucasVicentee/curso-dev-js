document.querySelector('.seu-nome').textContent = "Lucas Henrique Vicente dos Santos";

// 1º Passo: Mapear todos os botoões que serão manipulados no site (9 botões no total, eles são coletados através do ID ou da Classe dos inputs)
const inputPaginas = document.querySelector("#qtd-paginas");
const inputPrazo = document.querySelector("#prazo-entrega");
const inputDesconto = document.querySelector("#desconto");
const checkBoxDesign = document.querySelector("#inclui-design");
const resumoSubtotal = document.querySelector("#resumo-subtotal");
const resumoAdicional = document.querySelector("#resumo-adicional");
const resumoUrgencia = document.querySelector("#resumo-urgencia");
const resumoDesconto = document.querySelector("#resumo-desconto");
const resumoTotal = document.querySelector("#resumo-total");