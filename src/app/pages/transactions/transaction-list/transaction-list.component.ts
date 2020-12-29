import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Notification } from 'src/app/shared/scripts/notification';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent extends BaseResourceListComponent<Transaction> implements OnInit {

  form:  FormGroup = new FormGroup({});
  
  constructor(
    protected service: TransactionService
  ) {
    super(service);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.configurePagination();
  }

  private configurePagination(){
    this.paginationConfig.id = 'transactions-list-component';
  }
  
  protected actionsForSuccessDelete(resource: Transaction){
    Notification.showNotification('Transaction ' + resource.name + ' was removed.', 'pe-7s-trash', 'info', 'top', 'center');
    
    super.actionsForSuccessDelete(resource);
  }

}
