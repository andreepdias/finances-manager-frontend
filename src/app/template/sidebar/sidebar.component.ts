import { Component, OnInit } from '@angular/core';

declare interface MenuRouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuRoutes: MenuRouteInfo[] = [
    { path: 'transactions', title: 'Transactions', icon: 'nc-icon nc-money-coins', class: '' },
    { path: 'wallets', title: 'wallets', icon: 'pe-7s-wallet', class: '' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
