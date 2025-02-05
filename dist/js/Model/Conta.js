import Transacao, { TipoTransacao } from "./Transacao.js";
class Conta {
    titular;
    dataAbertura = new Date();
    dataEncerramento = new Date();
    saldo;
    limite;
    transacoes;
    constructor() {
        this.saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
        this.titular = "João Monteiro";
        this.dataAbertura = new Date();
        this.dataEncerramento = null;
        this.limite = 1000;
        this.transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }
    getTitular() {
        return this.titular;
    }
    setTitular(newTitular) {
        this.titular = newTitular;
    }
    getDataAbertura() {
        return this.dataAbertura;
    }
    setDataAbertura(newDataAbertura) {
        this.dataAbertura = newDataAbertura;
    }
    getDataEncerramento() {
        return this.dataEncerramento;
    }
    setDataEncerramento(newDataEncerramento) {
        this.dataEncerramento = newDataEncerramento;
    }
    getSaldo() {
        return this.saldo;
    }
    getLimite() {
        return this.limite;
    }
    setLimite(newLimite) {
        this.limite = newLimite;
    }
    getTransacoes() {
        return this.transacoes;
    }
    // set transacoes(newTransacoes: Transacao[]) {
    //     this._transacoes = newTransacoes;
    // }
    getDataAcesso() {
        return new Date();
    }
    getPrimeiroNomeTitular() {
        return this.titular.split(' ')[0];
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = [];
        this.transacoes.forEach(t => listaTransacoes.push(Transacao.clone(t)));
        console.log(listaTransacoes.map(t => t instanceof Transacao));
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.getData().getTime() - t1.getData().getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let dataTransacao = transacao.getData();
            let labelGrupoTransacao = dataTransacao.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.getTipoTransacao() == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.getValor());
        }
        else if (novaTransacao.getTipoTransacao() == TipoTransacao.TRANSFERENCIA || novaTransacao.getTipoTransacao() == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.getValor());
            novaTransacao.setValor(novaTransacao.getValor() * -1);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }
}
export default Conta;
