import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseServiceProvider, GeolocateServiceProvider, CameraServiceProvider } from '../../providers/providers'
import { ItineraryPage } from '../pages'

/**
 * Generated class for the PopularPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html',
})
export class PopularPage {

  constructor(private navCtrl: NavController, 
              private navParams: NavParams, 
              private modal: ModalController) {
  }

  openModal(){
    const myModal = this.modal.create(ItineraryPage);

    myModal.present();
  }
}
