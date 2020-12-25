import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/core/components/layout/layout.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { WalletsFormComponent } from './wallets-form/wallets-form.component';
import { WalletsListComponent } from './wallets-list/wallets-list.component';

const routes: Routes = [
  { path: 'wallets', component: LayoutComponent, canActivate: [ AuthGuard ], children: [
    { path: 'list', component: WalletsListComponent },
    { path: 'new', component: WalletsFormComponent },
    { path: ':id/edit', component: WalletsFormComponent },
    { path: '', redirectTo: '/wallets/list', pathMatch: 'full' },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule { }
