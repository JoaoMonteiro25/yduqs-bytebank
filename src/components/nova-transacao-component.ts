import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { Transacao } from "../types/transacao/Transacao.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";




const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

elementoFormulario.addEventListener("submit", function(event) {
    try{
        event.preventDefault();
        if(!elementoFormulario.checkValidity()){
            alert("Por favor , preencher todos os campos de transação!");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
        const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;

        let tipoTransacao: TipoTransacao=inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value + "00:00:00");

        const novaTransacao: Transacao  ={
            tipoTransacao:tipoTransacao,
            valor:valor,
            data:data

        }
 
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizarSaldo();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();

    }


    catch(erro){
        alert(erro.message);
    }
});