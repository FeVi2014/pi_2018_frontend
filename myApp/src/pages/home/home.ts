import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage as GameListPage } from '../game/list/list';
import { TabelaArtilhariaPage as ScorersListPage } from '../game/tabelaArtilharia/tabelaArtilharia';
import { DetailsPage as GameDetails } from '../game/details/details';
import jogos from '../../assets/js/jogos.js';
import artilheiros from '../../assets/js/artilheiros.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ultimoJogo: Object;
  artilheiros: Array<Object>;

  constructor(public navCtrl: NavController) {
    let ultimoJogo = <any> { dateTime: 0 };
    jogos.map(o => {
      let game = <any> o;
      game.dateTime = this.parseDateTime(game.horario, game.data);
      ultimoJogo = game.dateTime > ultimoJogo.dateTime ? game : ultimoJogo;
    })
    ultimoJogo.equipe1Logo = 'assets/imgs/' + ultimoJogo.equipe1.toLowerCase() + '.png';
    ultimoJogo.equipe2Logo = 'assets/imgs/' + ultimoJogo.equipe2.toLowerCase() + '.png';
    this.ultimoJogo =  ultimoJogo;

    const scorers = artilheiros.slice(0, 3);
    let scorer = <any> {};
    scorers.map(o => {
      scorer = o;
      scorer.nome = scorer.nome.split(" ")[0];
      scorer.equipeLogo = 'assets/imgs/' +  scorer.equipe.toLowerCase() + '.png';
    })
    this.artilheiros = scorers;
  }
  toGamesList(event, league) {
    this.navCtrl.push(GameListPage);
  }
  toScorersList(event, league) {
    this.navCtrl.push(ScorersListPage);
  }
  parseDateTime(hour:String, date:String): number {
    const dateArray = date.split("/")
    return parseInt(dateArray[2] + dateArray[1] + dateArray[0] + hour.replace(':', ''))
  }
  toGameDetails(event, game) {
    console.log(game)
    this.navCtrl.push(GameDetails, { game: game });
  }
}
