import Transacao from "../Model/Transacao.js";
import SaldoComponent from "./saldo-component.js";
import Conta from "../Model/Conta.js";
import ExtratoComponent from "./extrato-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }
        const inputTipoTransacao = document.querySelector("#tipoTransacao").value;
        const inputValorTransacao = document.querySelector("#valor").valueAsNumber;
        const inputData = document.querySelector("#data");
        const dataTransacao = new Date(inputData.value + " 00:00:00");
        let conta = new Conta();
        let novaTransacao = new Transacao(dataTransacao, inputValorTransacao, inputTipoTransacao, conta.getTitular(), "Outro titular");
        conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
