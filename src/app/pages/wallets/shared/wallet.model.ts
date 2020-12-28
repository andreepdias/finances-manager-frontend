export class Wallet {
    id: number = 0;
    name: string = '';
    amount: string = "0.0"
    icon: string = '';

    static icons = [
        { code: 'account_balance' },
        { code: 'account_balance_wallet' },
        { code: 'monetization_on' },
        { code: 'credit_card' },
        { code: 'local_atm' },
        { code: 'card_travel' },
        { code: 'favorite_border' },
        { code: 'grade' },
        { code: 'savings' },
    ];

    static fromJSON(json: any): Wallet{
        return Object.assign(new Wallet(), json);
    }
}