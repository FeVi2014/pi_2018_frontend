import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  selectedItemId: number;
  item: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.item = navParams.get('game');
    this.databaseProvider.getDatabaseState().subscribe(ready => {
      if (ready) {
        // this.getGameById(this.selectedItemId).then(res => {
        //   console.log(res);
        //   this.item = res;
        // }).catch(err => console.log(err));
      }
    });
  }
  // getGameById(id:number):any {
  //   return new Promise((resolve, reject) => {
  //     this.databaseProvider.getGameById(id).then(res => {
  //       resolve(res);
  //     }).catch(err => reject(err));
  //   })
  // }
}
