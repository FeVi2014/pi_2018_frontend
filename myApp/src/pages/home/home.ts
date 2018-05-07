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
        this.testeDb()
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
  testeDb():Promise<any> {
    const promises = [];
    this.databaseProvider.tables.map(table => {
                                              //NOME DA TABELA
      promises.push(this.databaseProvider.getAll(table));
                                              //NOME DA TABELA, ID
      promises.push(this.databaseProvider.getById(table, 1));
                                              //QUERY, PARAMETROS, COLUNAS  exp: ('SELECT id,nome FROM artilheiros WHERE id = ?', [1], ['id', 'nome'])
      promises.push(this.databaseProvider.getCustomize(`SELECT campos FROM ${table}`, [], ['campos']));
    })
    return Promise.all(promises).then(res => res).catch(err => err)
  }
  // loadLastGame():any {
  //   return new Promise((resolve, reject) => {
  //     this.databaseProvider.getLastGame().then(res => {
  //       resolve(res);
  //     }).catch(err => reject(err));
  //   })
  // }
}
