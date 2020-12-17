import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LayoutComponent } from './template/layout/layout.component';
import { TransactionsListComponent } from './pages/transactions/transactions-list/transactions-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'transactions', component: TransactionsListComponent },
    { path: '', redirectTo: '/transactions', pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
