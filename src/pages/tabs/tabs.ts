import { Component } from '@angular/core';

import { PopularPage, MatchesPage, HomePage, } from '../pages'


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PopularPage;
  tab2Root = MatchesPage;
  tab3Root = HomePage;

  constructor() {

  }
}