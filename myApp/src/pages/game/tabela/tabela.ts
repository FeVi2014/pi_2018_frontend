
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import jogos from '../../../assets/js/jogos.js';

@Component({
  selector: 'page-tabela',
  templateUrl: 'tabela.html'
})
export class TabelaPage {
  jogos: Object
  turnos:  Object;
  rodadas: Object;
  ligas: Array<String> [];
  ligaSelecionada: String;

  constructor(public navCtrl: NavController) {
    this.ligas = [];
    this.turnos = {};
    this.rodadas = {};
    this.ligaSelecionada = "Master";
    this.jogos = this.loadGames();
  }
  loadGames():any {
      let games = <any> {}
      let game = <any>{}
      jogos.map(o => {
        game = o;
        if(!games[game.categoria]) {
          games[game.categoria] = {}
          this.ligas.push(game.categoria);
        }
        if(!games[game.categoria][game.turno]) {
          games[game.categoria][game.turno] = {}
          if(!this.turnos[game.categoria]) this.turnos[game.categoria] = [];
          this.turnos[game.categoria].push(game.turno);
        }
        if(!games[game.categoria][game.turno][game.rodada]) {
          games[game.categoria][game.turno][game.rodada] = []
          if(!this.rodadas[game.categoria]) this.rodadas[game.categoria] = {}
          if(!this.rodadas[game.categoria][game.turno]) this.rodadas[game.categoria][game.turno] = []
          this.rodadas[game.categoria][game.turno].push(game.rodada);
        }
        game.equipe1Logo = 'assets/imgs/' + game.equipe1.toLowerCase() + '.png';
        game.equipe2Logo = 'assets/imgs/' + game.equipe2.toLowerCase() + '.png';

        games[game.categoria][game.turno][game.rodada].push(game);
      })
      return games;
  }
}
