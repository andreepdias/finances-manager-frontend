export class CurrencyUtil {

    format(amount: string){
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+amount);
    }
}