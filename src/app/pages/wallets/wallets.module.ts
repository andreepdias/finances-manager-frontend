import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsFormComponent } from './wallets-form/wallets-form.component';
import { WalletsListComponent } from './wallets-list/wallets-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [WalletsFormComponent, WalletsListComponent],
  imports: [
    CommonModule,
    WalletsRoutingModule,
    SharedModule
  ]
})
export class WalletsModule { }
