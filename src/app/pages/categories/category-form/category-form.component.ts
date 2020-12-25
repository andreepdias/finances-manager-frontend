import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Notification } from 'src/app/shared/scripts/notification';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> implements OnInit, AfterContentChecked {

  constructor(
    protected service: CategoryService,
    protected injector: Injector
  ) {
    super(new Category(), service, Category.fromJSON, injector);
  }

  protected buildForm(){
    this.resourceForm = this.formBuilder.group({
      id: [ null ],
      name: [ null, [ Validators.required ] ],
      description: [ null ],
      categoryTypeCode: [ null, [ Validators.required ] ],
    });
  }

  protected setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = 'New category';
      this.pageDescription = 'Adding a category.';
    }else{
      const categoryame = this.resource.name || '';
      this.pageTitle = 'Edit category';
      this.pageDescription = 'Editing category ' + categoryame;
    }
  }

  protected actionsForSuccess(category: Category){
    const message: string = (this.currentAction == 'new') ? 
      'Success creating a new category ' + category.name + '!' : 
      'Success editing category ' + category.name + '!';
    Notification.showNotification(message, this.notificationSuccessIcon, 'info', 'top', 'center');

    super.actionsForSuccess(category);
  }
  
  protected actionsForError(error: any){
    const message: string = (this.currentAction == 'new') ? 
    'Error creating a new category.' : 
    'Error editing this category.';
    Notification.showNotification(message, this.notificationErrorIcon, 'danger', 'top', 'center');

    super.actionsForError(error);
  }

  get typeOptions(): Array<any> {
    return Object.entries(Category.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }
}
