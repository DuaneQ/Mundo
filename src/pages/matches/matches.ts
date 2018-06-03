import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IndividMatchPage } from '../pages'

/**
 * Generated class for the MatchesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  tab1Root = MatchesPage;
  tab2Root = IndividMatchPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesPage');
  }

}
