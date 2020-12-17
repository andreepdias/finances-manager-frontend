import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsListComponent } from './wallets-list/wallets-list.component';


@NgModule({
  declarations: [WalletsListComponent],
  imports: [
    CommonModule,
    WalletsRoutingModule
  ]
})
export class WalletsModule { }
