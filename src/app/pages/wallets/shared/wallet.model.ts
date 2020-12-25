export class Wallet {
    id: number = 0;
    name: string = '';
    amount: string = "0.0"

    static fromJSON(json: any): Wallet{
        return Object.assign(new Wallet(), json);
    }
}