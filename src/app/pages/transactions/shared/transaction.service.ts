import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource-service.service';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseResourceService<Transaction>{

  constructor(
    protected injector: Injector
  ) {
    super('transactions', injector, Transaction.fromJSON)
  }
}
