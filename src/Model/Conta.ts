import Transacao, { GrupoTransacao, TipoTransacao } from "./Transacao.js";

class Conta {
    private titular: string;
    private dataAbertura: Date = new Date();
    private dataEncerramento: Date = new Date();
    private saldo: number;
    private limite: number;
    private transacoes: Transacao[];

    constructor() {
        this.saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
        this.titular = "João Monteiro";
        this.dataAbertura = new Date();
        this.dataEncerramento = null;
        this.limite = 1000;
        this.transacoes = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }

    public getTitular(): string {
        return this.titular;
    }
    
    public setTitular(newTitular: string) {
        this.titular = newTitular;
    }

    public getDataAbertura(): Date {
        return this.dataAbertura;
    }
    
    public setDataAbertura(newDataAbertura: Date) {
        this.dataAbertura = newDataAbertura;
    }

    public getDataEncerramento(): Date {
        return this.dataEncerramento;
    }
    
    public setDataEncerramento(newDataEncerramento: Date) {
        this.dataEncerramento = newDataEncerramento;
    }

    public getSaldo(): number {
        return this.saldo;
    }
    
    

    public getLimite(): number {
        return this.limite;
    }
    
    public setLimite(newLimite: number) {
        this.limite = newLimite;
    }

    public getTransacoes(): Transacao[] {
        return this.transacoes;
    }
    
    // set transacoes(newTransacoes: Transacao[]) {
    //     this._transacoes = newTransacoes;
    // }

    public getDataAcesso(): Date {
        return new Date();
    }

    public getPrimeiroNomeTitular(): string {
        return this.titular.split(' ')[0];
    }

    private debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
    
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    
    private depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
    
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }

    public getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = []

        this.transacoes.forEach(t => 
            listaTransacoes.push(Transacao.clone(t))
        );
        console.log(listaTransacoes.map(t => t instanceof Transacao));

        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.getData().getTime() - t1.getData().getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let dataTransacao = transacao.getData();
            let labelGrupoTransacao: string = dataTransacao.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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

    public registrarTransacao(novaTransacao: Transacao): void {
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