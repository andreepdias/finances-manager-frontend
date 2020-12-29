import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Notification } from 'src/app/shared/scripts/notification';
import { Wallet } from '../shared/wallet.model';
import { WalletService } from '../shared/wallet.service';

@Component({
  selector: 'app-wallets-form',
  templateUrl: './wallets-form.component.html',
  styleUrls: ['./wallets-form.component.css']
})
export class WalletsFormComponent extends BaseResourceFormComponent<Wallet> implements OnInit {

  icons = Wallet.icons;

  constructor(
    protected injector: Injector,
    protected service: WalletService
  ) {
    super(new Wallet(), service, Wallet.fromJSON, injector);
  }

  protected buildForm(){
    this.resourceForm = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      amount: [ null, [ Validators.required ] ],
      icon: [ null, [ Validators.required ] ]
    });
  }

  protected setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'New wallet';
      this.pageDescription = 'Creating a fresh wallet.';
    }else{
      const walletName = this.resource.name || '';
      this.pageTitle = 'Edit wallet';
      this.pageDescription = 'Modifying wallet ' + walletName;
    }
  }

  protected createResource(){
    this.resourceForm.value.amount = this.unformatCurrency(this.resourceForm.value.amount);
    return super.createResource();
  }

  protected updateResource(){
    this.resourceForm.value.amount = this.unformatCurrency(this.resourceForm.value.amount);
    return super.updateResource();
  }

  protected actionsForSuccess(wallet: Wallet){
    const message: string = (this.currentAction == 'new') ? 
    'Success creating a new wallet ' + wallet.name + '!' : 
    'Success editing wallet ' + wallet.name + '!';

    Notification.showNotification(message, this.notificationSuccessIcon, 'info', 'top', 'center');

    super.actionsForSuccess(wallet);
  }

  protected actionsForError(error: any){
    const message: string = (this.currentAction == 'new') ? 
    'Error creating a new wallet.' : 
    'Error editing this wallet.';
    Notification.showNotification(message, this.notificationErrorIcon, 'danger', 'top', 'center');

    super.actionsForError(error);
  }
  
  protected actionsForSuccessDelete(resource: Wallet){
    Notification.showNotification('Wallet ' + resource.name + ' was removed.', 'pe-7s-trash', 'info', 'top', 'center');
    super.actionsForSuccessDelete(resource);
  }

}
