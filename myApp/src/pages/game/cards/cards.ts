
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import cartoesAmarelos from '../../../assets/js/cartoes-amarelos.js';
import cartoesVermelhos from '../../../assets/js/cartoes-vermelhos.js';

@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cartoes: Array<Object>;

  constructor(public navCtrl: NavController) {
    cartoesAmarelos.map(o => o.cor = 'amarelo')
    cartoesVermelhos.map(o => o.cor = 'vermelho')
    this.cartoes = cartoesAmarelos.concat(cartoesVermelhos);
  }
}
