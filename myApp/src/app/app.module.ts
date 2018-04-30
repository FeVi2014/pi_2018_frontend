import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage as GameList } from '../pages/game/list/list';
import { DetailsPage as GameDetails } from '../pages/game/details/details';
import { FormPage as GameForm } from '../pages/game/form/form';
import { TabelaPage } from '../pages/game/tabela/tabela';
import { TabelaArtilhariaPage } from '../pages/game/tabelaArtilharia/tabelaArtilharia';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/adm/login/login';
import { DatabaseProvider } from '../providers/database/database';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GameList,
    GameDetails,
    TabelaPage,
    TabelaArtilhariaPage,
    LoginPage,
    GameForm
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GameList,
    GameDetails,
    TabelaPage,
    TabelaArtilhariaPage,
    LoginPage,
    GameForm
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
