import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
        this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['football'];

    this.items = [];
    for (let i = 1; i < 5; i++) {
      this.items.push({
        title: 'Time' + i,
        note: 'Esse é o time #' + i,
        icon: this.icons[this.icons.length-1]
      });
    }
  }
  link(page) {
    this.navCtrl.push(page);
  }
  itemTapped(event, item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }
}
