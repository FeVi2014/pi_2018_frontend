import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-regulation',
  templateUrl: 'regulation.html'
})

export class RegulationPage {

  file: string;

  constructor(public navCtrl: NavController) {
    this.file = "http://www.futeboldospais.com.br/campeonato2018/documentos/regulamento-2018.pdf";
    window.location.href = this.file;
    this.navCtrl.setRoot(HomePage);
  }

}
