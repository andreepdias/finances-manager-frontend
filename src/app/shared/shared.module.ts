import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormFiledErrorComponent } from './components/form-filed-error/form-filed-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { ChartModule } from "primeng/chart";
import { ListboxModule } from "primeng/listbox";


@NgModule({
  declarations: [
  FormFiledErrorComponent,
  ServerErrorMessagesComponent,
  PageHeaderComponent,
  PaginationComponent
],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    CalendarModule,
    ChartModule,
    FormsModule,
    DropdownModule,
    ListboxModule,

  ], exports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    IMaskModule,
    CalendarModule,
    ChartModule,
    FormsModule,
    DropdownModule,
    ListboxModule,
    
    ServerErrorMessagesComponent,
    FormFiledErrorComponent,
    PageHeaderComponent,
    PaginationComponent,
  ]
})
export class SharedModule { }
