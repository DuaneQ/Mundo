import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FirebaseServiceProvider, LoginServiceProvider, GeolocateServiceProvider, CameraServiceProvider } from '../providers/providers'
import { HomePage, LoginPage, SettingsPage, InfoPage,
LicensesPage, PrivacypolicyPage, TermsPage, PopularPage, TabsPage, 
MessageCenterPage, ItineraryPage, MatchesPage, IndividMatchPage} from '../pages/pages'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesServiceProvider } from '../providers/places-service/places-service';
import { AgmCoreModule } from '@agm/core';
import { SwipeSegmentDirective } from '../directives/swipe-segment.directive';
import { GooglePlus } from '@ionic-native/google-plus'
import { ItineraryListPage } from '../common/itinerary-list.component'

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
    LoginPage,
    SettingsPage,
    InfoPage,
    LicensesPage,
    TermsPage,
    PrivacypolicyPage,
    PopularPage,
    TabsPage,
    MessageCenterPage,
    ItineraryPage,
    MatchesPage,
    IndividMatchPage,
    SwipeSegmentDirective,
    ItineraryListPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireOfflineModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7kG6CDB_L5ebyPatP9Ke94a_avwnLWUU',
      libraries: ["places"]
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SettingsPage,
    InfoPage,
    LicensesPage,
    TermsPage,
    PrivacypolicyPage,
    PopularPage,
    TabsPage,
    MessageCenterPage,
    ItineraryPage,
    MatchesPage,
    IndividMatchPage,
    ItineraryListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    AngularFireOfflineModule,
    LoginServiceProvider,
    EmailComposer,
    Camera,
    GeolocateServiceProvider,
    Geolocation,
    PlacesServiceProvider,
    CameraServiceProvider,
    GooglePlus
  ]
})
export class AppModule {}
