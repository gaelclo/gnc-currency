import {Component} from '@angular/core';
import {AddPage} from '../add/add';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabHome: any = HomePage;
  tabAdd: any = AddPage;

  constructor() {}
}
