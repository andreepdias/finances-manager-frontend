import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  { path: 'transactions', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: TransactionListComponent },
    { path: 'new', component: TransactionFormComponent },
    { path: ':id/edit', component: TransactionFormComponent },
    { path: '', redirectTo: '/transactions/list', pathMatch: 'full' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
