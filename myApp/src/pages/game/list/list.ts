
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage as GameDetails } from '../details/details';
import { DatabaseProvider } from './../../../providers/database/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  games: Array<Object>

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadGames().then(res => {
          this.games = res;
          console.log(this.games);
        }).catch(err => console.log(err));
      }
    });
  }
  toGameDetails(event, id) {
    this.navCtrl.push(GameDetails, { id: id });
  }
  loadGames():any {
    return new Promise((resolve, reject) => {
      this.databaseProvider.getGames().then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
  }
}
