import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Notification } from 'src/app/shared/scripts/notification';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> implements OnInit {

  constructor(
    protected service: CategoryService
  ){
    super(service);
    this.configurePagination();
  }

  configurePagination(){
    this.paginationConfig.id = 'categories-list-component';
  }
  
  protected handleSuccessfulDeletion(category: Category){
    Notification.showNotification('Category ' + category.name + ' was removed.', 'pe-7s-trash', 'info', 'top', 'center');
    
    super.handleSuccessfulDeletion(category);
  }

}
