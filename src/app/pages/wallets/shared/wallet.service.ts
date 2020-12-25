import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource-service.service';
import { Wallet } from './wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends BaseResourceService<Wallet> {

  constructor(
    protected injector: Injector
  ) {
    super('wallets', injector, Wallet.fromJSON);
  }
}
