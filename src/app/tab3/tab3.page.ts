import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private menu: MenuController) { }

  openFirst() {
    console.log('First - clicked!')
    console.log(this.menu);
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
