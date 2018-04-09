import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  selectedItemId: number;
  item: object;
  gameNumbers: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItemId = navParams.get('id');
    this.getGameById(this.selectedItemId);
    this.gameNumbers = this.getGames().length;
  }
  getGameById(id:number):any{
    const games = this.getGames();
    games.map(o => {
      if(o.id == id){
        this.item =  o;
      } 
    });
  }
  getGames():any{
   return [
      {
        id:1,
        winner:{
          name: "Alemanha",
          score: 7,
          logo: '../assets/imgs/alemanha.png'
        },
        looser:{
          name: "Brasil",
          score: 1,
          logo: '../assets/imgs/brasil.png'
        },
        date: "05/02/2018",
        time: "08:30",
        scorers:[
          {
            player:{
              name: "Lucas",
              league: "master",
              number: "69",
              teamLogo: '../assets/imgs/alemanha.png',
            },
            team:'Alemanha',
            scores: 5
          },
          {
            player:{
              name: "Julio",
              league: "master",
              number: "12",
              teamLogo: '../assets/imgs/alemanha.png',
            },
            team:'Alemanha',
            scores: 2
          },
          {
            player:{
              name: "Leonardo",
              league: "master",
              number: "02",
              teamLogo: '../assets/imgs/brasil.png',
            },
            team:'Brasil',
            scores: 1
          },
        ],
        cards:[
          {
            player:{
              name: "Gabriel",
              league: "master",
              number: "24",
              teamLogo: '../assets/imgs/brasil.png',
            },
            card:"vermelho",
            time: 86
          }
        ],
        suspensions:
        [
          {
            player:{
              name: "Felipe",
              league: "master",
              number: "66",
              teamLogo: '../assets/imgs/alemanha.png',
            },
            critery: 4,
            games: 1,
            motive: "agressão"
          }
        ]
      },
      {
        id:2,
        winner:{
          name: "Russia",
          score: 2,
          logo: '../assets/imgs/russia.png'
        },
        looser:{
          name: "Austrália",
          score: 3,
          logo: '../assets/imgs/australia.png'
        },
        date: "04/02/2018",
        time: "08:00"
      },
      {
        id:3,
        winner:{
          name: "Argélia",
          score: 5,
          logo: '../assets/imgs/argelia.png'
        },
        looser:{
          name: "Canadá",
          score: 1,
          logo: '../assets/imgs/canada.png'
        },
        date: "03/02/2018",
        time: "09:30"
      },
      {
        id:4,
        winner:{
          name: "Brasil",
          score: 8,
          logo: '../assets/imgs/brasil.png'
        },
        looser:{
          name: "Austrália",
          score: 3,
          logo: '../assets/imgs/australia.png'
        },
        date: "02/02/2018",
        time: "10:57"
      }
    ];
  }
}
