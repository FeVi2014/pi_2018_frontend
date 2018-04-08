
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage as GameDetails } from '../details/details';
import { FormPage as GameForm } from '../form/form';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  championship: Object
  league: string;

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
      }
    ];

    this.championship = {
      league:[
        {
          title:"master",
          shift:[
            {
              round: games
            }
          ]
        },
        {
          title:"senior",
          shift:[
            {
              round: games
            }
          ]
        },
      ],
    }

    //precisar ser dinamico
    this.league = "master";
  }

  toGameDetails(id) {
    this.navCtrl.push(GameDetails, { id: id });
  }
  toGameForm() {
    this.navCtrl.push(GameForm);
  }
}
    
    
    
    
    
    
    
