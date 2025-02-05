import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../Model/Conta.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const elementoNomeTitular = document.querySelector(".usuario span");
const elementoPrimeiroNomeTitular = document.querySelector(".block-saldo h2");
let conta = new Conta();
elementoNomeTitular.textContent = conta.getTitular();
elementoPrimeiroNomeTitular.textContent = `Olá, ${conta.getPrimeiroNomeTitular()}!`;
elementoDataAcesso.textContent = formatarData(conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
renderizarSaldo();
function renderizarSaldo() {
    let conta = new Conta();
    elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
    console.log("SaldoComponent: mostrarSaldo!");
    console.log("Grupo de Transações", conta.getGruposTransacoes());
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
