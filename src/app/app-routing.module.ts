import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { LayoutComponent } from './template/layout/layout.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { WalletsListComponent } from './wallets/wallets-list/wallets-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, children: [
    { path: 'transactions', component: TransactionsListComponent },
    { path: 'wallets', component: WalletsListComponent },
    { path: '', redirectTo: '/transactions', pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
