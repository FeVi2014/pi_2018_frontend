import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage as GameListPage } from '../game/list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lastGame: Object;
  lastestPosts: Array<Object>;
  
  constructor(public navCtrl: NavController) {
    this.lastGame = {
      id:1,
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
      date: "05/02/2018",
      league: "master"
    }
    this.lastestPosts = [];
    const posts = [
      {
        title: 'Brasil se fu...',
        comment: 'Partida inesquecivel aqui no lugar que se joga futebol, coisas muito dahoras acontecendo, gente pra caralho e muito mais',
        date: "05/02/2018",
      },
      {
        title: 'Coisa boa vem ai',
        comment: 'Governo brasileiro decide parar de gastar dinheiro com futebole e outras inutilidades e investir em escolas publicas',
        date: "04/02/2018",
      },
    ];
    this.lastestPosts = posts;
  }
  
  toGamesList(event, league) {
    this.navCtrl.push(GameListPage, { league: league });
  }

}
