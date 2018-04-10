import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { FirebaseServiceProvider, GeolocateServiceProvider, CameraServiceProvider } from '../../providers/providers'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app'
import { SettingsPage, InfoPage } from '../pages'
import { Storage } from '@ionic/storage';
import { MapsAPILoader } from '@agm/core';
import { Camera } from '@ionic-native/camera';
import {} from 'types/googlemaps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  loggedInUser: any = null;
  
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('searchPlaces') public searchPlacesElement: ElementRef;

  location: string;
  intPlaces:string[] = []; 
  private myPhotosRef: any;
  private myPhoto: any;
  private myPhotoURL: any;
  private userId:string;
  connectionNotifications: boolean = true;
  messageNotifications: boolean = true;
  public firestore = firebase.storage();

  constructor(public navCtrl: NavController,
              private facebook: Facebook,
              private firebaseSvcProvider: FirebaseServiceProvider,
              private storage: Storage,
              private geolocate: GeolocateServiceProvider,
              private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private navParams: NavParams,
              private camera: Camera,
              private afAuth: AngularFireAuth,
              private actionSheetCtrl: ActionSheetController,
              private platform: Platform,
              private cameraServiceProvider: CameraServiceProvider) {

        this.afAuth.authState.subscribe(user => {
        this.userId = user.uid
        this.myPhotosRef = firebase.storage().ref(`/Photos/${ this.userId }/`);
      });
    }

  ngOnInit(){
        this.mapsApiLoader.load().then(
        () => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types:['(cities)']});

          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                if(place.geometry === undefined || place.geometry === null){
                  return;
              }
                this.location = place.formatted_address;
              });
            });
          }
        )
      this.mapsApiLoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchPlacesElement.nativeElement, {types:['(cities)']});

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();

              if(place.geometry === undefined || place.geometry === null){
                return;
            }
              this.intPlaces.push(place.formatted_address);
            });
          });
        }
      )
    }

  goToSettings(){
        this.navCtrl.push(SettingsPage); 
  }

  goToInfo(){
        this.navCtrl.push(InfoPage); 
  }

  deletePlace(place) {
        this.intPlaces.splice(this.intPlaces.indexOf(place),1);
  }

  ionViewDidLoad() {
      console.log('Did load');
      this.loggedInUser = firebase.auth().currentUser; // code from firebase docs
      this.geolocate.onLocateUser();

      this.firestore.ref(`/Photos/${ this.userId }/`).child('photo1.png').getDownloadURL().then((url) => {
          this.cameraServiceProvider.photo1 = url;
        }).catch((error) => {
          console.log(error.message);
          this.cameraServiceProvider.photo1 = 'UseButton'
          console.log(this.cameraServiceProvider.photo1);
        });

        this.firestore.ref(`/Photos/${ this.userId }/`).child('photo2.png').getDownloadURL().then((url) => {
          this.cameraServiceProvider.photo2 = url;
        }).catch((error) => {
          console.log(error.message);
          this.cameraServiceProvider.photo2 = 'UseButton'
          console.log(this.cameraServiceProvider.photo2);
        });

        this.firestore.ref(`/Photos/${ this.userId }/`).child('photo3.png').getDownloadURL().then((url) => {
          this.cameraServiceProvider.photo3 = url;
        }).catch((error) => {
          console.log(error.message);
          this.cameraServiceProvider.photo3 = 'UseButton'
          console.log(this.cameraServiceProvider.photo3);
        });

        this.firestore.ref(`/Photos/${ this.userId }/`).child('photo4.png').getDownloadURL().then((url) => {
          this.cameraServiceProvider.photo4 = url;
        }).catch((error) => {
          console.log(error.message);
          this.cameraServiceProvider.photo4 = 'UseButton'
          console.log(this.cameraServiceProvider.photo4);
        });
      }

    selectPhoto(photoName: string){
      this.cameraServiceProvider.selectPhoto(photoName);
    }

    Present(photoName: string){
      this.cameraServiceProvider.Present(photoName);
    }
}
