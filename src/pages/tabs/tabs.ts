import { Component } from '@angular/core';

import { PopularPage, MessageCenterPage, HomePage } from '../pages'


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PopularPage;
  tab2Root = MessageCenterPage;
  tab3Root = HomePage;

  constructor() {

  }
}