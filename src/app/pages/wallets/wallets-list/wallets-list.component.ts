import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Notification } from 'src/app/shared/scripts/notification';

import { Wallet } from "../shared/wallet.model";
import { WalletService } from '../shared/wallet.service';


@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.css']
})
export class WalletsListComponent extends BaseResourceListComponent<Wallet> implements OnInit {

  constructor(
    protected service: WalletService
  ) {
    super(service);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.configurePagination();
  }

  private configurePagination(){
    this.paginationConfig.id = 'wallets-list-component';
    this.paginationConfig.itemsPerPage = 24;
  }
  
  protected actionsForSuccessDelete(resource: Wallet){
    Notification.showNotification('Wallet ' + resource.name + ' was removed.', 'pe-7s-trash', 'info', 'top', 'center');
    super.actionsForSuccessDelete(resource);
  }
}
