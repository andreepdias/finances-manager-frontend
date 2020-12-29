import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Notification } from 'src/app/shared/scripts/notification';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Wallet } from '../../wallets/shared/wallet.model';
import { WalletService } from '../../wallets/shared/wallet.service';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';
declare var $:any;

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent extends BaseResourceFormComponent<Transaction> implements OnInit {

  categories: any = [];
  wallets: Wallet[] = [];

  constructor(
    protected injector: Injector,
    protected service: TransactionService,
    protected categoryService: CategoryService,
    protected walletService: WalletService
  ) {
    super(new Transaction(), service, Transaction.fromJSON, injector);
  }

  ngOnInit(){
    super.ngOnInit();
    this.loadCategories();
    this.loadWallets();
    this.setDefaultDate();
  }

  protected buildForm(){
    this.resourceForm = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      description: [ null ],
      amount: [ null, [ Validators.required ] ],
      categoryId: [ null, [ Validators.required ] ],
      walletId: [ null, [ Validators.required ] ],
      date: [ null, [ Validators.required ] ],
    })
  }

  private loadCategories(){
    return this.categoryService.getAll().subscribe(
      categories => this.buildCategoriesDropDown(categories),
      error => console.log('Error loading categories in transaction form: ', error)
    );
  }

  private buildCategoriesDropDown(categories: Category[]){
    let categoriesDropDown = [];
    let types = Object.entries(Category.types);
    
    for(let type in types){
      let typeName = types[type][1];

      let categoriesName = categories.filter(c => c.categoryTypeName == typeName).map(c => ({categoryName: c.name, categoryId: c.id }) );
      let categoryType = {
        typeName: typeName,
        categories: categoriesName
      };

      categoriesDropDown.push(categoryType);
      this.categories = categoriesDropDown;
    }
  }

    
  private loadWallets(){
    return this.walletService.getAll().subscribe(
      wallets => this.wallets = wallets,
      error => console.log('Error loading wallets in transaction form: ', error)
    );
  }

  private setDefaultDate(){
    let today = new Date();
    let todayString = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    this.resourceForm.patchValue({date: todayString});
  }

  protected setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'New transaction';
      this.pageDescription = 'Creating a new transaction.';
    }else{
      this.pageTitle = 'Edit transaction';
      this.pageDescription = 'Modifying transaction ' + this.resource.name + '.';
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

  protected actionsForSuccess(transaction: Transaction){
    const message: string = (this.currentAction == 'new') ? 
    'Success creating a new transaction ' + transaction.name + '!' : 
    'Success editing transaction ' + transaction.name + '!';

    Notification.showNotification(message, this.notificationSuccessIcon, 'info', 'top', 'center');

    super.actionsForSuccess(transaction);
  }

  protected actionsForError(error: any){
    const message: string = (this.currentAction == 'new') ? 
    'Error creating a new transaction.' : 
    'Error editing this transaction.';
    Notification.showNotification(message, this.notificationErrorIcon, 'danger', 'top', 'center');

    super.actionsForError(error);
  }
}
