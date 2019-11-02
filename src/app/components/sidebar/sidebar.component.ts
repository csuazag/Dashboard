import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Inicio', icon: 'home', class: '' },
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/table-list', title: 'API', icon: 'library_books', class: '' },
  //{ path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/team', title: 'Equipo', icon: 'emoji_people', class: '' }
  //{ path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
