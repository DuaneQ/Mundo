import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ItineraryPage } from '../pages'
import { Employee } from '../../models/employee.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { IItinerary } from '../../models/itinerary'

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
export class PopularPage implements OnInit {

  itineraryList$: FirebaseListObservable<IItinerary[]>;
  languages = ['English', 'Spanish', 'Other'];
  model = new Employee('Shae', 'Kenya', true, '1099', 'Spanish');

  constructor(private navCtrl: NavController, 
              private modal: ModalController,
              public afDatabase: AngularFireDatabase) {
  }

  ngOnInit(){
    this.itineraryList$ =  this.afDatabase.list(`/itineraries/`);
  }

  openModal(){
    const myModal = this.modal.create(ItineraryPage);

    myModal.present();
  }
}
