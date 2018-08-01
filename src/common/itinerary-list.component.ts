import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { IItinerary } from '../models/itinerary'

@Component({
  selector: 'itinerary-list',
  templateUrl: 'itinerary-list.component.html',
})

export class ItineraryListPage  {

  @Input() userItinerary: IItinerary;
}