import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InfoPage } from '../pages/info/info';
import { RegulationPage } from '../pages/regulation/regulation';
import { ListPage as GameList } from '../pages/game/list/list';
import { SuspensionsPage } from '../pages/game/suspensions/suspensions';
import { CardsPage } from '../pages/game/cards/cards';
import { ClassificationsPage } from '../pages/game/classifications/classifications';
import { TabelaPage } from '../pages/game/tabela/tabela';
import { TabelaArtilhariaPage } from '../pages/game/tabelaArtilharia/tabelaArtilharia';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, icon: "home" },
      { title: 'Jogos', component: GameList, icon: "football"},
      { title: 'Artilheiros', component: TabelaArtilhariaPage, icon: "locate" },
      { title: 'Suspensões', component: SuspensionsPage, icon: "logo-freebsd-devil" },
      { title: 'Cartões', component: CardsPage, icon: "square" },
      { title: 'Classificações', component: ClassificationsPage, icon: "podium" },
      { title: 'Tabela', component: TabelaPage, icon: "calendar" },
      // { title: 'Regulamento', component: RegulationPage, icon: "bookmarks" },
      { title: 'Informações', component: InfoPage, icon: "information-circle" },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
