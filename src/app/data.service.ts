import { Injectable } from '@angular/core';
import * as blockstack from "blockstack";
import { UserData } from "blockstack/lib/auth/authApp";
import { Title } from '@angular/platform-browser';
import { makeUUID4 } from 'blockstack';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  appConfig = new blockstack.AppConfig();
  userSession = new blockstack.UserSession({ appConfig: this.appConfig });
  userData: UserData;
  userProfile;
  private useEncryption: boolean = true;

  constructor() { }

  getLists(): Observable<List[]> {
    return from(this.userSession.getFile('/lists.json', { decrypt: this.useEncryption })
      .then((fileContents: any) => {
        if (fileContents) {
          return JSON.parse(fileContents);
        } else {
          return [];
        }
      }));
  }

  saveList(list: List[]): Observable<boolean> {
    return from(this.userSession.putFile('/lists.json', JSON.stringify(list), { encrypt: this.useEncryption })
      .then((res) => {
        console.log('saved list');
        return true;
      }).catch((reason) => {
        console.log(`Error when saving lists. Error [${reason}]`);
        return false;
      }));
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

  getUserData() {
    return this.userData;
  }

  createNewList() {
    return { title: '', items: [], id: makeUUID4() } as List;
  }
}

export class List {
  id: string;
  title: string;
  items: ListItem[];
}

export class ListItem {
  title: string;
  content: string;
  status: string;
}
