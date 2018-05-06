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
  private databaseConfig: any;
  private tables: Array<String>;
  private jsonUrls: Array<String>;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform ) {
    this.databaseReady = new BehaviorSubject(false);
    this.databaseConfig = this.getDatabaseConfig();
    this.jsonUrls = this.getJsonUrls();
    this.tables = this.getTables();
    this.platform.ready().then(() => {
      this.sqlite.create(this.databaseConfig).then((db: SQLiteObject) => {
        this.database = db;
        this.hasToUpdate().then(yes => {
          if (yes) {
            this.updateDatabase().then(res => console.log(res)).catch(err => console.log(err));
          } else {
            this.databaseReady.next(true);
          }
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  getDatabaseConfig() {
    return {
      name: 'fdp.db',
      location: 'default'
    };
  }
  getTables() {
    //MANTER NESSA ORDEM
    return [
      "config",
      "artilheiros",
      "cartoes-amarelos",
      "cartoes-vermelhos",
      "jogos",
      "tabela",
      "suspensos",
      "classificacao-4as-finais",
      "classificacao-geral"
    ]
  }
  getJsonUrls() {
    //MANTER NESSA ORDEM
    return [
      'http://www.futeboldospais.com.br/config/config.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/artilheiros.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/cartoes-amarelos.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/cartoes-vermelhos.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/jogos.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/tabela.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/suspensos.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/classificacao-4as-finais.txt',
      'http://www.futeboldospais.com.br/campeonato2018/json/classificacao-geral.txt'
    ]
  }
  ajaxGet(url) {
  	return new Promise ((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (!xhr) resolve(null);
      xhr.open("GET", url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          resolve(xhr.responseText);
        }
      }
      xhr.send(null);
    })
  }
  getDataConfig() {
    return this.database.executeSql("SELECT * FROM config", []).then(res => {
      const config = {
        year: null,
        version: null
      };
      if (res.rows.length > 0) {
        config.year = res.rows.item(0).campeonatoAno;
        config.version = res.rows.item(0).versaoAtualizacao;
        return config;
      } else {
        return null;
      }
    }, err => {
      console.log(err);
      return null;
    })
  }
  hasToUpdate() {
    return new Promise ((resolve, reject) => {
      this.ajaxGet('http://www.futeboldospais.com.br/config/config.txt').then(json => {
        let jsonToObject = <any>{};
        jsonToObject = json;
        const siteConfig = JSON.parse(jsonToObject);
        this.getDataConfig().then(dbConfig => {
          if(!dbConfig) resolve(true);
          if(siteConfig.campeonatoAno != dbConfig.year) resolve(true);
          if(siteConfig.versaoAtualizacao != dbConfig.version) resolve(true);
          resolve(false);
        }).catch(err => reject(err));
      }).catch(err => reject(err));;
    });
  }
  updateDatabase() {
    return new Promise ((resolve, reject) => {
      const gets = this.jsonUrls.map(url => this.ajaxGet(url));
      Promise.all(gets).then(gets => {
        const inserts = []
        const creates = [];
        gets.map((json, index) => {
          const operations = this.formatJsonAndDbOperations(json, this.tables[index]);
          creates.push(operations.create);
          inserts.push(operations.insert);
        })
        Promise.all(creates).then(res => {
          Promise.all(inserts).then(res => resolve(res)).catch(err => reject(err))
        }).catch(err => reject(err))
      }).catch(err => reject(err))
    });
  }
  formatJsonAndDbOperations(json, table) {
    let jsonToObject = <any>{};
    jsonToObject = json;
    const formatedJson = JSON.parse(jsonToObject);
    const operations = {
      create: null,
      insert: null
    }
    if(formatedJson.length > 0) {
      //REGRA ESPECIFICA DA classificacao-4as-finais.txt
      if(formatedJson[0].listaClassificacao) {
        const fields = Object.keys(formatedJson[0].listaClassificacao[0]);
        fields.push("categoria", "grupo");
        operations.create = this.createTable(table, fields);
        formatedJson.map(o => {
          o.listaClassificacao.map(d => {
            const data = fields.map(key => d[key]);
            data.push(o.categoria, o.grupo);
            operations.insert = this.insert(table, fields, data);
          })
        })
      } else {
        const fields = Object.keys(formatedJson[0]);
        operations.create = this.createTable(table, fields);
        formatedJson.map(o => {
          const data = fields.map(key => o[key]);
          operations.insert = this.insert(table, fields, data);
        })
      }
    } else {
      const fields = Object.keys(formatedJson);
      const data = fields.map(key => formatedJson[key]);
      operations.insert = this.insert(table, fields, data);
      operations.create = this.createTable(table, fields);
    }
    return operations;
  }

  createTable(name:String, fields:Array<String>) {
    return new Promise((resolve, reject) => {
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS ${name}`, fields).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  insert(table:String, fields:Array<String>, data:Array<any>) {
    return new Promise((resolve, reject) => {
      const values = fields.map(o => "?");
      this.database.executeSql(`INSERT INTO ${table} (${fields.join(",")}) VALUES (${values.join(",")})`, data).then(res => resolve(res)).catch(err => reject(err))
    })
  }
  getLogos() {
    //this.ajaxGet('http://www.futeboldospais.com.br/campeonato2018/distintivos/Uruguai.png');
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
