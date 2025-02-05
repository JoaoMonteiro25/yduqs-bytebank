import Conta from "../Model/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
function gerarExtrato() {
    let conta = new Conta();
    let gruposTransacoes = conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    if (gruposTransacoes.length == 0) {
        elementoRegistroTransacoesExtrato.innerHTML = "Sem transações";
        return;
    }
    for (let grupoTransacao of gruposTransacoes) {
        let htmlGrupo = "";
        let htmlTransacao = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacao += `<div class="transacao-item">
                                    <div class="transacao-info">
                                        <span class="tipo">${transacao.getTipoTransacao()}</span>
                                        <strong class="valor">${formatarMoeda(transacao.getValor())}</strong>
                                    </div>
                                    <time class="data">${formatarData(transacao.getData(), FormatoData.DIA_MES)}</time>
                                </div>`;
        }
        htmlGrupo += `<div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
            ${htmlTransacao}
        </div>`;
        elementoRegistroTransacoesExtrato.innerHTML += htmlGrupo;
    }
}
const ExtratoComponent = {
    atualizar() {
        gerarExtrato();
    }
};
gerarExtrato();
export default ExtratoComponent;
