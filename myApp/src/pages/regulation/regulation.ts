import { Component } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-regulation',
  templateUrl: 'regulation.html',
  providers: [FileOpener]
})

export class RegulationPage {

  constructor(private fileOpener: FileOpener) {
    this.fileOpener.open('../../assets/files/regulamento2018.pdf', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(err => console.log(err));
  }

}
