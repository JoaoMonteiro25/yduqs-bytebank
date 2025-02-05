class Transacao {
    tipoTransacao;
    valor;
    data = new Date();
    titularOrigem;
    titularDestino;
    constructor(data, valor, tipoTransacao, titularOrigem, titularDestino) {
        this.tipoTransacao = tipoTransacao;
        this.valor = valor;
        this.data = data;
        this.titularOrigem = titularOrigem;
        this.titularDestino = titularDestino;
    }
    getTipoTransacao() {
        return this.tipoTransacao;
    }
    setTipoTransacao(newTipoTransacao) {
        this.tipoTransacao = newTipoTransacao;
    }
    getValor() {
        return this.valor;
    }
    setValor(newValor) {
        this.valor = newValor;
    }
    getData() {
        return this.data;
    }
    setData(newData) {
        this.data = newData;
    }
    getTitularOrigem() {
        return this.titularOrigem;
    }
    setTitularOrigem(newTitularOrigem) {
        this.titularOrigem = newTitularOrigem;
    }
    getTitularDestino() {
        return this.titularDestino;
    }
    setTitularDestino(newTitularDestino) {
        this.titularDestino = newTitularDestino;
    }
    static clone(obj) {
        var ts = new Transacao(obj.data, obj.valor, obj.tipoTransacao, obj.titularOrigem, obj.titularDestino);
        return ts;
    }
}
export var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacao["TRANSFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacao["PAGAMENTO_BOLETO"] = "Pagamento de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
export default Transacao;
