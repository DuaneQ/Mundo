import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseServiceProvider, GeolocateServiceProvider, CameraServiceProvider } from '../../providers/providers'
import { AngularFireAuth } from 'angularfire2/auth';
import { SettingsPage, InfoPage, LoginPage, PopularPage, MessageCenterPage } from '../pages'
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  loggedInUser: any = null;
  
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('searchPlaces') public searchPlacesElement: ElementRef;
  @ViewChild('myInput') public myInput: ElementRef;

  location: string;
  intPlaces:string[] = []; 
  private myPhotosRef: any;
  private userId:string;
  connectionNotifications: boolean = true;
  messageNotifications: boolean = true;
  showTrips: boolean = true;
  public firestore = firebase.storage();
  private bio: any;
  private settings: any;
  tab1Root = PopularPage;
  tab2Root = MessageCenterPage;
  tab3Root = HomePage;

  constructor(public navCtrl: NavController,
              private firebaseSvcProvider: FirebaseServiceProvider,
              private geolocate: GeolocateServiceProvider,
              private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private afAuth: AngularFireAuth,
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
      this.loggedInUser = firebase.auth().currentUser; // code from firebase docs
      this.geolocate.onLocateUser();

      this.firestore.ref(`/Photos/${ this.userId }/`).child('photo0.png').getDownloadURL().then((url) => {
          this.cameraServiceProvider.photo0 = url;
        }).catch((error) => {
          console.log(error.message);
          this.cameraServiceProvider.photo0 = 'UseButton'
          console.log(this.cameraServiceProvider.photo0);
        });

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

          this.firebaseSvcProvider.getSettings().subscribe( firebaseSettings => {
          this.settings = firebaseSettings;
          this.bio = (typeof this.settings.bio === 'undefined') ? '' : this.settings.bio;
          this.intPlaces = (typeof this.settings.intPlaces === 'undefined') ? [] : this.settings.intPlaces;
          this.location = (typeof this.settings.location === 'undefined') ? '' : this.settings.location;
          this.connectionNotifications = (typeof this.settings.connectionNotifications === 'undefined') ? true : this.settings.connectionNotifications;
          this.messageNotifications = (typeof this.settings.messageNotifications === 'undefined') ? true : this.settings.messageNotifications;
          this.showTrips = (typeof this.settings.showTrips === 'undefined') ? true : this.settings.showTrips;
          });
      }

    selectPhoto(photoName: string){
      this.cameraServiceProvider.selectPhoto(photoName);
    }

    Present(photoName: string){
      this.cameraServiceProvider.Present(photoName);
    }

    resize() {
      this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    }

    logoutOfFacebook():firebase.Promise<void> {
          //const userId:string = firebase.auth().currentUser.uid;
          //firebase.database().ref('/users/${userId}').off();
          return firebase.auth().signOut().then(() => {
            this.navCtrl.setRoot(LoginPage);
          }); 
    }

    savePersonalInfo() {
      this.firebaseSvcProvider.addSettings(this.location,
                                          this.intPlaces,
                                          this.bio,
                                          this.connectionNotifications,
                                          this.messageNotifications,
                                          this.showTrips).then(() => {
                                          this.navCtrl.parent.select(0)});
    }

    skipAddingInfo(){
      this.navCtrl.parent.select(0);
    }
}
