import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { FirebaseServiceProvider } from '../../providers/providers'

/**
 * Generated class for the InfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public userId:string;
  public photo1: any;
  public photo2: any;
  public photo3: any;
  public photo4: any;
  public photo5: any;

  public firestore = firebase.storage();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public camera: Camera,
              public afAuth: AngularFireAuth,
              public firebaseSvcProvider: FirebaseServiceProvider) {

        this.afAuth.authState.subscribe(user => {
        this.userId = user.uid
        this.myPhotosRef = firebase.storage().ref(`/Photos/${ this.userId }/`);
      });
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
 
 //generates unique name for pic uploads but not sure if I'm going to use it.
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  ionViewDidLoad() {
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
}
