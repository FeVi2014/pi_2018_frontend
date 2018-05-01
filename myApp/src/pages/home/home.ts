import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage as GameListPage } from '../game/list/list';
import { DetailsPage as GameDetails } from '../game/details/details';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lastGame: Object;
  lastestPosts: Array<Object>;

  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider) {
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadLastGame().then(res => {
          this.lastGame = res;
          console.log(this.lastGame);
        }).catch(err => console.log(err));
      }
    });
  }
  toGamesList(event, league) {
    this.navCtrl.push(GameListPage);
  }
  toGameDetails(event, id) {
    console.log(id)
    this.navCtrl.push(GameDetails, { id: id });
  }
  loadLastGame():any {
    return new Promise((resolve, reject) => {
      this.databaseProvider.getLastGame().then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
  }
}
