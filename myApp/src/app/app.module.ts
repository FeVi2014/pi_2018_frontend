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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GameList,
    GameDetails,
    TabelaPage,
    TabelaArtilhariaPage,
    GameForm
  ],
  imports: [
    BrowserModule,
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
    GameForm
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
