
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage as GameDetails } from '../details/details';
import { FormPage as GameForm } from '../form/form';
import { DatabaseProvider } from './../../../providers/database/database';

@Component({
  selector: 'page-tabela',
  templateUrl: 'tabela.html'
})
export class TabelaPage {

  league: Array<Object>
  selectedLeague: String
  groups:Object
  groupKeys:Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.selectedLeague = "M";
    this.league = [
      { title:'MASTER', value: 'M' },
      { title:'SENIOR', value: 'S' }
    ];
    this.groups = {};
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.loadTeams().then(res => {
          res.map(o => {
            if(!this.groups[o.league]) this.groups[o.league] = {}
            if(!this.groups[o.league][o.group]) this.groups[o.league][o.group] = []
            this.groups[o.league][o.group].push(o)
          })
          console.log(this.groups)
          this.getGroupKeys(this.selectedLeague);
        }).catch(err => console.log(err));
      }
    });
  }
  loadTeams():any {
    return new Promise((resolve, reject) => {
      this.databaseProvider.getTeams().then(res => {
        resolve(res);
      }).catch(err => reject(err));
    })
  }
  getGroupKeys(league:any) {
    this.groupKeys =  Object.keys(this.groups[league])
  }
}
