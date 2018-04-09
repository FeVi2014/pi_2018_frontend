
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tabelaArtilharia',
  templateUrl: 'tabelaArtilharia.html'
})
export class TabelaArtilhariaPage {

  scorers: Array<{
    name:string,
    totalGols:number,
    league:string,
    team:string,
    logo:string
  }>;

  champion: number;
  
  championship: Array<{
    id:number,
    year: number,
    league: Array<object>
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     
    this.scorers = [
      {        
        name: "Julião",        
        totalGols: 60,
        league: 'master',
        team: 'Brasil',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'        
      },

      {        
        name: "Pelé",        
        totalGols: 59,
        league: 'master',
        team: 'Brasil',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'                
      },

      {        
        name: "Ruy",        
        totalGols: 32,
        league: 'master',
        team: 'Chile',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'               
      },

      {        
        name: "Messi",        
        totalGols: 31,
        league: 'master',
        team: 'Suecia',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'               
      },

      {        
        name: "Kaká",        
        totalGols: 31,
        league: 'master',
        team: 'Brasil',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'               
      },

      {        
        name: "Diego",        
        totalGols: 30,
        league: 'master',
        team: 'Brasil',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'               
      },

      {        
        name: "Imbra",        
        totalGols: 29,
        league: 'master',
        team: 'Suecia',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'               
      },

      {        
        name: "Guerra",        
        totalGols: 12,
        league: 'master',
        team: 'Peru',
        logo: 'https://pbs.twimg.com/profile_images/844442450546561024/3F2TyCUH_400x400.jpg'               
      },
      
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
    
    
    
    
    
    
    
