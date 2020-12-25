import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseResourceFormComponent } from './components/base-resource-form/base-resource-form.component';
import { BaseResourceListComponent } from './components/base-resource-list/base-resource-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormFiledErrorComponent } from './components/form-filed-error/form-filed-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IMaskModule } from 'angular-imask';



@NgModule({
  declarations: [

  FormFiledErrorComponent,

  ServerErrorMessagesComponent,

  PageHeaderComponent,

  PaginationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule

  ], exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    IMaskModule,
    
    ServerErrorMessagesComponent,
    FormFiledErrorComponent,
    PageHeaderComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
