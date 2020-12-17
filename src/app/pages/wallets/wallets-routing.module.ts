import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { LayoutComponent } from '../../template/layout/layout.component';
import { WalletsListComponent } from './wallets-list/wallets-list.component';

const routes: Routes = [
  { path: 'wallets', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: WalletsListComponent },
    { path: '', redirectTo: '/wallets/list', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule { }
