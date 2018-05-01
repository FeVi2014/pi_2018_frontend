import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Platform } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  constructor(
    public http: Http,
    private sqlitePorter: SQLitePorter,
    private storage: Storage,
    private sqlite: SQLite,
    private platform: Platform) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'fdp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.storage.get('database_filled').then(val => {
          if (val) {
            this.databaseReady.next(true);
          } else {
            this.fillDatabase();
          }
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  fillDatabase() {
    this.http.get('assets/db.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          }).catch(err => console.log(err));
      });
  }
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
  getGames() {
    return this.database.executeSql("SELECT * FROM jogo_campeonato ORDER BY data DESC", []).then(res => {
      const jogos = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          jogos.push({
            id: res.rows.item(i).id,
            team1: res.rows.item(i).time_1,
            team2: res.rows.item(i).time_2,
            team1Logo: res.rows.item(i).time_1_logo,
            team2Logo: res.rows.item(i).time_2_logo,
            team1Score: res.rows.item(i).time_1_gols,
            team2Score: res.rows.item(i).time_2_gols,
            championship: res.rows.item(i).campeonato,
            championshipStep: res.rows.item(i).campeonato_etapa,
            championshipStepRound: res.rows.item(i).campeonato_etapa_rodada,
            date: this.formatDate(res.rows.item(i).data),
            league: res.rows.item(i).liga
          })
        }
      }
      return jogos;
    }, err => {
      console.log(err);
      return [];
    })
  }
  getTeams() {
    return this.database.executeSql("SELECT * FROM _time", []).then(res => {
      const teams = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          teams.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).nome,
            logo: res.rows.item(i).logo,
            score: res.rows.item(i).pontos,
            games: res.rows.item(i).jogos,
            scoreDifference: res.rows.item(i).saldo_gols,
            league: res.rows.item(i).liga,
            group: res.rows.item(i).grupo
          })
        }
      }
      return teams;
    }, err => {
      console.log(err);
      return [];
    })
  }
  getScorers() {
    return this.database.executeSql("SELECT * FROM artilheiro_campeonato ORDER BY gols DESC", []).then(res => {
      const scorers = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          scorers.push({
            name: res.rows.item(i).nome,
            team: res.rows.item(i)._time,
            teamLogo: res.rows.item(i).time_logo,
            score: res.rows.item(i).gols,
            league: res.rows.item(i).liga
          })
        }
      }
      return scorers;
    }, err => {
      console.log(err);
      return [];
    })
  }
  getLastGame() {
    return this.database.executeSql("SELECT * FROM jogo_campeonato ORDER BY data DESC", []).then(res => {
      let jogo = {};
      if (res.rows.length > 0) {
          jogo = {
            id: res.rows.item(0).id,
            team1: res.rows.item(0).time_1,
            team2: res.rows.item(0).time_2,
            team1Logo: res.rows.item(0).time_1_logo,
            team2Logo: res.rows.item(0).time_2_logo,
            team1Score: res.rows.item(0).time_1_gols,
            team2Score: res.rows.item(0).time_2_gols,
            championship: res.rows.item(0).campeonato,
            championshipStep: res.rows.item(0).campeonato_etapa,
            championshipStepRound: res.rows.item(0).campeonato_etapa_rodada,
            date: this.formatDate(res.rows.item(0).data),
            league: res.rows.item(0).liga,
          }
      }
      return jogo;
    }, err => {
      console.log(err);
      return [];
    })
  }
  getGameById(id:number) {
    const game = {
      id: null,
      team1: null,
      team2: null,
      team1Logo: null,
      team2Logo: null,
      team1Score: null,
      team2Score: null,
      championship: null,
      date: null,
      league: null,
      championshipStep: null,
      championshipStepRound: null,
      scorers: [],
      cards: [],
      suspensions: [],
    };
    const promises = [
      this.database.executeSql("SELECT * FROM jogo_campeonato WHERE id = ?", [id]),
      this.database.executeSql("SELECT * FROM artilheiro_jogo WHERE id_jogo = ?", [id]),
      this.database.executeSql("SELECT * FROM cartao_jogo WHERE id_jogo = ?", [id]),
      this.database.executeSql("SELECT * FROM suspensao_jogo WHERE id_jogo = ?", [id])
    ]
    return Promise.all(promises).then(res => {
      if (res[0].rows.length > 0) {
          game.id = res[0].rows.item(0).id;
          game.team1 = res[0].rows.item(0).time_1;
          game.team2 = res[0].rows.item(0).time_2;
          game.team1Logo = res[0].rows.item(0).time_1_logo;
          game.team2Logo = res[0].rows.item(0).time_2_logo;
          game.team1Score = res[0].rows.item(0).time_1_gols;
          game.team2Score = res[0].rows.item(0).time_2_gols;
          game.championship = res[0].rows.item(0).campeonato;
          game.date = this.formatDate(res[0].rows.item(0).data);
          game.league = res[0].rows.item(0).liga;
          game.championshipStep = res[0].rows.item(0).campeonato_etapa;
          game.championshipStepRound = res[0].rows.item(0).campeonato_etapa_rodada;
      }
      if (res[1].rows.length > 0) {
        for (let i = 0; i < res[1].rows.length; i++) {
          game.scorers.push({
            name: res[1].rows.item(i).nome,
            team: res[1].rows.item(i)._time,
            teamLogo: res[1].rows.item(i).time_logo,
            score: res[1].rows.item(i).gols,
            league: res[1].rows.item(i).liga
          })
        }
      }
      if (res[2].rows.length > 0) {
        for (let i = 0; i < res[2].rows.length; i++) {
          game.cards.push({
            player: res[2].rows.item(i).jogador,
            team: res[2].rows.item(i)._time,
            teamLogo: res[2].rows.item(i).time_logo,
            card: res[2].rows.item(i).cartao
          })
        }
      }
      if (res[3].rows.length > 0) {
        for (let i = 0; i < res[3].rows.length; i++) {
          game.suspensions.push({
            player: res[3].rows.item(i).jogador,
            team: res[3].rows.item(i)._time,
            teamLogo: res[3].rows.item(i).time_logo,
            critery: res[3].rows.item(i).criterio,
            reason: res[3].rows.item(i).motivo
          })
        }
      }
      return game;
    }, err => {
      console.log(err);
      return game;
    })
  }
  formatDate(date:number):String {
    const stringDate = date.toString().length === 7 ? "0" + date.toString() : date.toString();
    const formatDate = stringDate.substring(0, 2) + "/" + stringDate.substring(2, 4) + "/" + stringDate.substring(4, 8)
    return formatDate;
  }
  // addGame(team1, team2, team1Score, team2Score) {
  //   const data = [team1, team2, team1Score, team2Score];
  //   return this.database.executeSql("INSERT INTO jogos (time_1, time_2, time_1_gols, time_2_gols) VALUES (?, ?, ?, ?)", data).then(res => {
  //     return res;
  //   }).catch(err => console.log(err));
  // }
}
