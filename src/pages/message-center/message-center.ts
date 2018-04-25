import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/providers'

/**
 * Generated class for the MessageCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-message-center',
  templateUrl: 'message-center.html',
})
export class MessageCenterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
