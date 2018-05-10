import { ActionSheetController, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';

/*
  Generated class for the CameraServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CameraServiceProvider {

  private myPhotosRef: any;
  private myPhoto: any;
  private myPhotoURL: any;
  private userId:string;
  public photo1: any;
  public photo2: any;
  public photo3: any;
  public photo4: any;
  public photo0: any;
  private firestore = firebase.storage();
  loggedInUser: any = null;

  constructor(private actionSheetCtrl: ActionSheetController,
              private platform: Platform,
              private camera: Camera,
              private afAuth: AngularFireAuth) {
            
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

  //Changes the button to the pic after upload.
      changeFromButtonToPic(photo: string){
        switch(photo) { 
          case 'photo0.png': { 
            this.firestore.ref(`/Photos/${ this.userId }/`).child('photo0.png').getDownloadURL().then((url) => {
                this.photo0 = url;
              }).catch((error) => {
                console.log(error.message);
                console.log(this.photo0);
              });
              break; 
          }

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
          case 'photo0.png': { 
            this.photo0 = 'UseButton'
            break; 
          } 

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
