
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage as GameDetails } from '../details/details';
import { DatabaseProvider } from './../../../providers/database/database';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  games: Object
  championship: Array<number>
  league: Array<Object>
  shift: Array<Object>
  round: Array<Object>
  selectedLeague: String

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.selectedLeague = "M";
    this.championship = [2018];
    this.games = {
      S: [],
      M: []
    };
    this.league = [
      { title:'MASTER', value: 'M' },
      { title:'SENIOR', value: 'S' }
    ];
    this.round = [
      { title: "1º Rodada", value: "1" }
    ]
    this.shift = [
      { title:'1º Turno', value: '1' },
    ];
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadGames().then(res => {
          res.map(o => {
            this.games[o.league].push(o)
          })
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
