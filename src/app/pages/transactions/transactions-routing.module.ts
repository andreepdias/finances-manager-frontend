import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { LayoutComponent } from '../../template/layout/layout.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

const routes: Routes = [
  { path: 'transactions', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: TransactionsListComponent },
    { path: '', redirectTo: '/transactions/list', pathMatch: 'full' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
