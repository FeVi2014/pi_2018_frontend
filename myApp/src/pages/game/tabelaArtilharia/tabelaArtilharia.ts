
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../../providers/database/database';
import artilheiros from '../../../assets/js/artilheiros.js';

@Component({
  selector: 'page-tabelaArtilharia',
  templateUrl: 'tabelaArtilharia.html'
})
export class TabelaArtilhariaPage {

  artilheiros: Array<Object>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let scorer = <any>{};
    artilheiros.map(o => {
      scorer = o;
      scorer.nome = scorer.nome.split(" ")[0];
      scorer.equipeLogo = 'assets/imgs/' + scorer.equipe.toLowerCase() + '.png';
    })
    this.artilheiros = artilheiros;
  }
}
