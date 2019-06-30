import { Injectable } from '@angular/core';
import * as blockstack from "blockstack";
import { UserData } from "blockstack/lib/auth/authApp";
import { Title } from '@angular/platform-browser';
import { makeUUID4 } from 'blockstack';
import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { locateDirectiveOrProvider } from '@angular/core/src/render3/di';

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
  getList(listId: string): Observable<List> {
    return this.getLists().pipe(map(result => {
      const listItem = result.find(lt => lt.id == listId);
      if (!listItem)
        console.warn(`Could not find the list with id [${listId}].`);
      return listItem;
    }));
  }

  removeList(listToRemove: List, currentList: List[]): Observable<boolean> {
    const listIndex = currentList.indexOf(listToRemove);
    currentList.splice(listIndex, 1);
    return this.saveList(currentList);
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

  getListItems(listId): Observable<ListItem[]> {
    const fileUrl = `/${listId}.json`;
    console.log(`Tryign to  listItems [${fileUrl}]`);
    return from(this.userSession.getFile(fileUrl, { decrypt: this.useEncryption })
      .then((fileContents: any) => {
        if (fileContents) {
          return JSON.parse(fileContents);
        } else {
          return [];
        }
      }).catch(error => {
        console.log(`Error when trying to read list items from listId [${listId}]. Error [${error}]`);
      }));
  }
  saveListItems(listId: string, listItems: ListItem[]): Observable<boolean> {
    if (listId) {
      return from(this.userSession.putFile(`/${listId}.json`, JSON.stringify(listItems), { encrypt: this.useEncryption })
        .then((res) => {
          return true;
        }).catch((reason) => {
          console.log(`Error when saving list items. Error [${reason}]`);
          return false;
        }));
    } else {
      return of(false);
    }
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
