import { Injectable } from '@angular/core';
import * as blockstack from "blockstack";
import { UserData } from "blockstack/lib/auth/authApp";
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  appConfig = new blockstack.AppConfig();
  userSession = new blockstack.UserSession({ appConfig: this.appConfig });
  userData: UserData;
  userProfile;

  constructor() { }

  getLists() {
    let returnList: List[] = [
      { title: "List 1", items: [] },
      { title: "List 2", items: [] },
      { title: "List 3", items: [] }
    ];

    return returnList;
  }

  signIn() {
    if (this.userSession.isUserSignedIn()) {
      this.userData = this.userSession.loadUserData();
      this.userProfile = new blockstack.Person(this.userData)._profile;
    } else if (this.userSession.isSignInPending()) {
      this.userSession.handlePendingSignIn().then(userData => {
        this.userData = userData;
        this.userData = this.userSession.loadUserData();
        this.userProfile = new blockstack.Person(this.userData)._profile;
      });
    } else {
      this.userSession.redirectToSignInWithAuthRequest();
    }
  }


}

export class List {
  title: string;
  items: ListItem[];
}

export class ListItem {
  title: string;
  content: string;
  status: string;
}
