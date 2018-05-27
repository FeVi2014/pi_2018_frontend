
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';
import classificacaoGeral from '../../../assets/js/classificacao-geral.js';

@Component({
  selector: 'page-classifications',
  templateUrl: 'classifications.html'
})
export class ClassificationsPage {
  classificacoes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.classificacoes = classificacaoGeral;
  }
}
