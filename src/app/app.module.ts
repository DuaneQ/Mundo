import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FirebaseServiceProvider } from '../providers/providers'
import { HomePage, ListPage, LoginPage} from '../pages/pages'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyAXX54EgG7dHbs-lgm_uRheJm-1Q-4NBGk",
    authDomain: "fir-92abc.firebaseapp.com",
    databaseURL: "https://fir-92abc.firebaseio.com",
    projectId: "fir-92abc",
    storageBucket: "fir-92abc.appspot.com",
    messagingSenderId: "920843394799"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
  ],
  providers: [
    FirebaseServiceProvider,
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
  ]
})
export class AppModule {}
