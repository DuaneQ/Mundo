import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { FirebaseServiceProvider, GeolocateServiceProvider } from '../../providers/providers'
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
  private photo1: any;
  private photo2: any;
  private photo3: any;
  private photo4: any;
  private photo5: any;
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
              private platform: Platform) {

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

  selectPhoto(photoName: string): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto(photoName);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
 
  private uploadPhoto(photoName: string): void {
    this.myPhotosRef.child(photoName)
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
        this.changeFromButtonToPic(photoName);
      });
  }

    ionViewDidLoad() {
      this.loggedInUser = firebase.auth().currentUser; // code from firebase docs
      this.geolocate.onLocateUser();

      this.firestore.ref(`/Photos/${ this.userId }/`).child('photo1.png').getDownloadURL().then((url) => {
          this.photo1 = url;
        }).catch((error) => {
          console.log(error.message);
          this.photo1 = 'UseButton'
          console.log(this.photo1);
        });

        this.firestore.ref(`/Photos/${ this.userId }/`).child('photo2.png').getDownloadURL().then((url) => {
          this.photo2 = url;
        }).catch((error) => {
          console.log(error.message);
          this.photo2 = 'UseButton'
          console.log(this.photo2);
        });

        this.firestore.ref(`/Photos/${ this.userId }/`).child('photo3.png').getDownloadURL().then((url) => {
          this.photo3 = url;
        }).catch((error) => {
          console.log(error.message);
          this.photo3 = 'UseButton'
          console.log(this.photo3);
        });

        this.firestore.ref(`/Photos/${ this.userId }/`).child('photo4.png').getDownloadURL().then((url) => {
          this.photo4 = url;
        }).catch((error) => {
          console.log(error.message);
          this.photo4 = 'UseButton'
          console.log(this.photo4);
        });
      }

      //Changes the button to the pic after upload.
      changeFromButtonToPic(photo: string){
        switch(photo) { 
          case 'photo1.png': { 
            this.firestore.ref(`/Photos/${ this.userId }/`).child('photo1.png').getDownloadURL().then((url) => {
                this.photo1 = url;
              }).catch((error) => {
                console.log(error.message);
                console.log(this.photo1);
              });
              break; 
          } 

          case 'photo2.png': { 
            this.firestore.ref(`/Photos/${ this.userId }/`).child('photo2.png').getDownloadURL().then((url) => {
              this.photo2 = url;
            }).catch((error) => {
              console.log(error.message);
              console.log(this.photo2);
            });              
            break; 
          } 

          case 'photo3.png': { 
            this.firestore.ref(`/Photos/${ this.userId }/`).child('photo3.png').getDownloadURL().then((url) => {
              this.photo3 = url;
            }).catch((error) => {
              console.log(error.message);
              console.log(this.photo3);
            });              
            break; 
          } 

          case 'photo4.png': { 
            this.firestore.ref(`/Photos/${ this.userId }/`).child('photo4.png').getDownloadURL().then((url) => {
              this.photo4 = url;
            }).catch((error) => {
              console.log(error.message);
              console.log('case statement' + this.photo4);
            });              
            break; 
          } 

          default: { 
              console.log("Invalid choice");  
              break; 
          } 
        } 
      }

      DeletePhoto(photoName: string){
        var deleteRef = this.firestore.ref(`/Photos/${ this.userId }/`).child(photoName);
        deleteRef.delete().then(() => {
        this.ChangeFromPicToButton(photoName);
        }).catch(() => {
          console.log('Delete Photo failed')
        });
      }
      
      //Changes the pic to the button after upload.
      ChangeFromPicToButton(photo: string){
        switch(photo) { 
          case 'photo1.png': { 
            this.photo1 = 'UseButton'
            break; 
          } 

          case 'photo2.png': { 
            this.photo2 = 'UseButton'             
            break; 
          } 

          case 'photo3.png': { 
            this.photo3 = 'UseButton'             
            break; 

          } 

          case 'photo4.png': { 
            this.photo4 = 'UseButton'           
            break; 
          } 

          default: { 
            console.log("Invalid choice");  
            break; 
          } 
        } 
      }

      Present(photoName: string) {
        let actionSheet = this.actionSheetCtrl.create({
        title: 'Albums',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              this.DeletePhoto(photoName);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
            }
          }
        ]
    });
    actionSheet.present();
  }
}
