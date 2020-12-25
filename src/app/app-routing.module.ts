import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { TransactionListComponent } from './pages/transactions/transaction-list/transaction-list.component';
import { WalletsListComponent } from './pages/wallets/wallets-list/wallets-list.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: '', redirectTo: '/categories/list', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
