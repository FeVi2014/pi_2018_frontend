
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage as GameDetails } from '../details/details';
import { FormPage as GameForm } from '../form/form';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  championship: Array<{
      id:number,
      year: number,
      league: Array<object>
    }>;
  league: string;
  champion: number;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    const games = [
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
        time: "08:30"
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

    const shifts = [
      {
        title:"Semifinais",
        round: {
          games:[games,games,games,games],
          number: 4
        }
      },
      {
        title:"Quartas",
        round: {
          games:[games,games,games,games],
          number: 3
        }
      },
      {
        title:"2º Turno",
        round: {
          games:[games,games,games,games],
          number: 2
        }
      },
      {
        title:"1º Turno",
        round: {
          games:[games,games,games,games],
          number: 1
        }
      },
    ]

    this.championship = [
      {
        id:1,
        year: 2018,
        league:[
          {
            title:"master",
            shift: shifts
          },
          {
            title:"senior",
            shift: shifts
          },
        ],
      },
      {
        id:2,
        year: 2017,
        league:[
          {
            title:"master",
            shift: shifts
          },
          {
            title:"senior",
            shift: shifts
          },
        ],
      }
    ]

    //precisar ser dinamico
    this.league = "master";
    
    this.champion = this.getLatest();
    
  }
 getLatest():number {
    this.championship.map(o => {
      if(o.year ==  new Date().getFullYear()) return o.id;
    })
    return 1;
  }
  toGameDetails(id) {
    this.navCtrl.push(GameDetails, { id: id });
  }
  toGameForm() {
    this.navCtrl.push(GameForm);
  }
}
    
    
    
    
    
    
    
