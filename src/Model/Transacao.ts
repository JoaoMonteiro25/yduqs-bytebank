class Transacao {
    private tipoTransacao: TipoTransacao;
    private valor: number;
    private data: Date = new Date();
    private titularOrigem: string;
    private titularDestino: string;

    constructor(data: Date, valor: number, tipoTransacao: TipoTransacao, titularOrigem: string, titularDestino: string) {
        this.tipoTransacao = tipoTransacao;
        this.valor =  valor;
        this.data = data;
        this.titularOrigem = titularOrigem;
        this.titularDestino = titularDestino;
    }

    public getTipoTransacao(): TipoTransacao {
        return this.tipoTransacao;
    }
    
    public setTipoTransacao(newTipoTransacao: TipoTransacao) {
        this.tipoTransacao = newTipoTransacao;
    }

    public getValor(): number {
        return this.valor;
    }
    
    public setValor(newValor: number) {
        this.valor = newValor;
    }

    public getData(): Date {
        return this.data;
    }
    
    public setData(newData: Date) {
        this.data = newData;
    }

    public getTitularOrigem(): string {
        return this.titularOrigem;
    }
    
    public setTitularOrigem(newTitularOrigem: string) {
        this.titularOrigem = newTitularOrigem;
    }

    public getTitularDestino(): string {
        return this.titularDestino;
    }
    
    public setTitularDestino(newTitularDestino: string) {
        this.titularDestino = newTitularDestino;
    }

    public static clone(obj: any): Transacao {
        var ts = new Transacao(obj.data, obj.valor, obj.tipoTransacao, obj.titularOrigem, obj.titularDestino);
        return ts;
    }
}

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}

export enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

export default Transacao