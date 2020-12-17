import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { TransactionsModule } from './pages/transactions/transactions.module';
import { WalletsModule } from './pages/wallets/wallets.module';
import { AuthenticationModule } from './pages/authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    TemplateModule,
    AuthenticationModule,
    TransactionsModule,
    WalletsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
