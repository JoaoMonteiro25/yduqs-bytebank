import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

 
const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

function exibirSaldo():void {
    elementoSaldo.textContent=formatarMoeda(Conta.getSaldo());
}

exibirSaldo();

const SaldoComponent = {
    atualizar() {
        console.log("SaldoComponent: atualizar!")
        exibirSaldo();
    }
}

export default SaldoComponent;