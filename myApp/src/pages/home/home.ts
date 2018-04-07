import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lastGame: Object;
  lastestPosts: Array<Object>;
  
  constructor(public navCtrl: NavController) {
    this.lastGame = {
      winner:{
        name: "Alemanha",
        score: "7",
        logo: '../assets/imgs/alemanha.png'
      },
      looser:{
        name: "Brasil",
        score: "1",
        logo: '../assets/imgs/brasil.png'
      },
      date: "05/02/2018"
    }
    this.lastestPosts = [];
    for (let i = 1; i < 5; i++) {
      this.lastestPosts.push({
        title: 'Que Jogo bosta',
        comment: 'Nunca mais vejo futebol',
        icon: 'assets/imgs/logo.png'
      });
    }
  }
}
