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
    return this.database.executeSql("SELECT * FROM jogos ORDER BY data DESC", []).then(res => {
      const jogos = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          jogos.push({
            team1: res.rows.item(i).time_1,
            team2: res.rows.item(i).time_2,
            team1Logo: res.rows.item(i).time_1_logo,
            team2Logo: res.rows.item(i).time_2_logo,
            team1Score: res.rows.item(i).time_1_gols,
            team2Score: res.rows.item(i).time_2_gols,
            championship: res.rows.item(i).campeonato,
            date: res.rows.item(i).data,
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
  getLastGame() {
    return this.database.executeSql("SELECT * FROM jogos ORDER BY data DESC", []).then(res => {
      const jogo = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < 1; i++) {
          jogo.push({
            team1: res.rows.item(i).time_1,
            team2: res.rows.item(i).time_2,
            team1Logo: res.rows.item(i).time_1_logo,
            team2Logo: res.rows.item(i).time_2_logo,
            team1Score: res.rows.item(i).time_1_gols,
            team2Score: res.rows.item(i).time_2_gols,
            championship: res.rows.item(i).campeonato,
            date: this.formatDate(res.rows.item(i).data),
            league: res.rows.item(i).liga
          })
        }
      }
      return jogo[0];
    }, err => {
      console.log(err);
      return [];
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
