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
        name: 'campeonatos.db',
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
    this.http.get('assets/inserts.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          }).catch(err => console.log(err));
      });
  }
  addGame(team1, team2, team1Score, team2Score) {
    const data = [team1, team2, team1Score, team2Score];
    return this.database.executeSql("INSERT INTO jogos (time_1, time_2, time_1_gols, time_2_gols) VALUES (?, ?, ?, ?)", data).then(res => {
      return res;
    }).catch(err => console.log(err));
  }
  getGames() {
    return this.database.executeSql("SELECT * FROM jogos", []).then(res => {
      const jogos = [];
      console.log(res);
      if (res.rows.length > 0) {
        console.log("tem coisa");
      } else {
        console.log("nenhuma jogo encontrado");
      }
    }, err => {
      console.log(err);
      return [];
    })
  }
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
}
