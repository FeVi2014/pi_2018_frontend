
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';
import suspensos from '../../../assets/js/suspensos.js';

@Component({
  selector: 'page-suspensions',
  templateUrl: 'suspensions.html'
})
export class SuspensionsPage {
  suspensions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.suspensions = suspensos;
  }
}
