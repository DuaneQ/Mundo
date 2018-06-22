import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, Tabs, Events, NavParams } from  'ionic-angular';

import { PopularPage, MatchesPage, HomePage, } from '../pages'


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabs: Tabs;

  tab1Root = PopularPage;
  tab2Root = MatchesPage;
  tab3Root = HomePage;
  mySelectedIndex: number;

  constructor(private nav: NavController,
              private platform: Platform,
              private evts:Events,
              private renderer:Renderer,
              private navParams: NavParams) {

        this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}