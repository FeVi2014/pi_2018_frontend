
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';

@Component({
  selector: 'page-tabelaArtilharia',
  templateUrl: 'tabelaArtilharia.html'
})
export class TabelaArtilhariaPage {

  league: Array<Object>
  selectedLeague: String
  scorers:Object

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.selectedLeague = "M";
    this.league = [
      { title:'MASTER', value: 'M' },
      { title:'SENIOR', value: 'S' }
    ];
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadScorers().then(res => {
          this.scorers = {};
          res.map(o => {
            if(!this.scorers[o.league]) this.scorers[o.league] = []
            this.scorers[o.league].push(o)
          })
          console.log(this.scorers)
        }).catch(err => console.log(err));
      }
    });
  }
  loadScorers():any {
    return new Promise((resolve, reject) => {
      this.databaseProvider.getScorers().then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
  }

}
