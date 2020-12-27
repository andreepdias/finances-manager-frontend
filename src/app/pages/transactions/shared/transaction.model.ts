import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from '../../categories/shared/category.model';
import { Wallet } from '../../wallets/shared/wallet.model';

export class Transaction extends BaseResourceModel{
    id: number = 0;
    name: string = '';
    description: string = '';
    amount: string = '';
    date: string = '';
    
    categoryId: number = 0;
    category: Category = new Category();
    
    walletId: number = 0;
    wallet: Wallet = new Wallet();

    static fromJSON(json: any): Transaction {
        return Object.assign(new Transaction(), json);
    }
}