
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage as GameDetails } from '../details/details';
import { FormPage as GameForm } from '../form/form';

@Component({
  selector: 'page-tabela',
  templateUrl: 'tabela.html'
})
export class TabelaPage {

  championship: Array<{
    id:number,
    year: number,
    league: Array<object>
  }>;

  grupos:Array<{

    id:number,
    nome: string,    
    league: string,
    team: Array<{
        id:number,
        nome:String,
        bandeira:String,
        pontos:number,    
        jogos:number,    
        saldodegols:number        
    }>

  }>;

  champion: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.grupos = [
      {
        id: 1,
        nome: 'Grupo A',
        league: "Master",
        team: [{
          id: 0,
          nome: "Sel. Brasil   ",
          bandeira: "asset/img/brasil.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },
        {
          id: 1,
          nome: "Argentina",
          bandeira: "asset/img/Argentina.jpg",
          pontos: 0,
          jogos: 3,
          saldodegols: -38,
        },
        {
          id: 2,
          nome: "Portugal",
          bandeira: "asset/img/Portugal.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 3,
          nome: "Inglaterra",
          bandeira: "asset/img/brasil.jpg",
          pontos: 2,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 4,
          nome: "Alemanha",
          bandeira: "asset/img/Alemanha.jpg",
          pontos: 3,
          jogos: 3,
          saldodegols: 7,
        }
        ]
      },

      {
        id: 1,
        nome: 'Grupo B',
        league: "Master",
        team: [{
          id: 0,
          nome: "Sel. Brasil",
          
          bandeira: "asset/img/brasil.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },
        {
          id: 1,
          nome: "Argentina",
          bandeira: "asset/img/Argentina.jpg",
          pontos: 0,
          jogos: 3,
          saldodegols: -38,
        },
        {
          id: 2,
          nome: "Portugal ",
          bandeira: "asset/img/Portugal.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 3,
          nome: "Inglaterra",
          bandeira: "asset/img/brasil.jpg",
          pontos: 2,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 4,
          nome: "Alemanha",
          bandeira: "asset/img/Alemanha.jpg",
          pontos: 3,
          jogos: 3,
          saldodegols: 7,
        }
        ]
      },

      {
        id: 1,
        nome: 'Grupo B',
        league: "Master",
        team: [{
          id: 0,
          nome: "Sel. Brasil",
          bandeira: "asset/img/brasil.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },
        {
          id: 1,
          nome: "Argentina",
          bandeira: "asset/img/Argentina.jpg",
          pontos: 0,
          jogos: 3,
          saldodegols: -38,
        },
        {
          id: 2,
          nome: "Portugal",
          bandeira: "asset/img/Portugal.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 3,
          nome: "Inglaterra",
          bandeira: "asset/img/brasil.jpg",
          pontos: 2,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 4,
          nome: "Alemanha",
          bandeira: "asset/img/Alemanha.jpg",
          pontos: 3,
          jogos: 3,
          saldodegols: 7,
        }
        ]
      },

      {
        id: 1,
        nome: 'Grupo D',
        league: "Master",
        team: [{
          id: 0,
          nome: "Sel. Brasil",
          bandeira: "asset/img/brasil.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },
        {
          id: 1,
          nome: "Argentina",
          bandeira: "asset/img/Argentina.jpg",
          pontos: 0,
          jogos: 3,
          saldodegols: -38,
        },
        {
          id: 2,
          nome: "Portugal",
          bandeira: "asset/img/Portugal.jpg",
          pontos: 6,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 3,
          nome: "Inglaterra",
          bandeira: "asset/img/brasil.jpg",
          pontos: 2,
          jogos: 3,
          saldodegols: -3,
        },

        {
          id: 4,
          nome: "Alemanha",
          bandeira: "asset/img/Alemanha.jpg",
          pontos: 3,
          jogos: 3,
          saldodegols: 7,
        }
        ]
      }


    ]

    this.championship = [
      {
        id:1,
        year: 2018,
        league:[
          {
            title:"master"            
          },
          {
            title:"senior"            
          },
        ],
      },
      {
        id:2,
        year: 2017,
        league:[
          {
            title:"master"            
          },
          {
            title:"senior"            
          },
        ],
      }
    ]
    
    this.champion = this.getLatest(); 
  }

  getLatest():number {
    this.championship.map(o => {
      if(o.year ==  new Date().getFullYear()) return o.id;
    })
    return 1;
  }
  
}
    
    
    
    
    
    
    
