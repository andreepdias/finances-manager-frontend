import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoriesModule } from '../pages/categories/categories.module';
import { WalletsModule } from '../pages/wallets/wallets.module';
import { TransactionsModule } from '../pages/transactions/transactions.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NavbarComponent, 
    SidebarComponent, 
    FooterComponent, 
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CategoriesModule,
    WalletsModule,
    TransactionsModule,
    HttpClientModule
  ], 
  exports: [
  ]
})
export class CoreModule { }
