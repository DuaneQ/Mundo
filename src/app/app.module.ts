import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FirebaseServiceProvider } from '../providers/providers'
import { HomePage, ListPage, LoginPage, SettingsPage, InfoPage} from '../pages/pages'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { IonicStorageModule } from '@ionic/storage';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { EmailComposer } from '@ionic-native/email-composer';

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
    LoginPage,
    SettingsPage,
    InfoPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireOfflineModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SettingsPage,
    InfoPage
  ],
  providers: [
    FirebaseServiceProvider,
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    AngularFireOfflineModule,
    LoginServiceProvider,
    EmailComposer
  ]
})
export class AppModule {}
