import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Important',
      url: '/todos',
      icon: 'alert'
    },
    {
      title: 'All',
      url: '/todos',
      icon: 'list'
    },
    {
      title: 'Scheduled',
      url: '/todos',
      icon: 'calendar'
    },
    {
      title: 'Grocery',
      url: '/todos',
      icon: 'pizza'
    },
    {
      title: 'Shopping list',
      url: '/todos',
      icon: 'cart'
    },
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
