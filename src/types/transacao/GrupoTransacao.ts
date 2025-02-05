import Transacao from "../../Model/Transacao";
export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}