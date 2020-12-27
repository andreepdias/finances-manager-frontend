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
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuRoutes: MenuRouteInfo[] = [
    { path: '/reports', title: 'Reports', icon: 'pe-7s-graph1', class: '' },
    { path: '/transactions', title: 'Transactions', icon: 'nc-icon nc-money-coins', class: '' },
    { path: '/wallets', title: 'Wallets', icon: 'pe-7s-wallet', class: '' },
    { path: '/categories', title: 'Categories', icon: 'nc-icon nc-bullet-list-67', class: '' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
