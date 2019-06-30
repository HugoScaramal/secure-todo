import { Component, OnInit, ViewChild } from '@angular/core';
import { List, DataService } from '../data.service';
import { UserData } from 'blockstack/lib/auth/authApp';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  userData: UserData;
  lists: List[];
  editMode: boolean = false;
  newMode: boolean = false;
  @ViewChild('newItemInput') newInput: IonInput;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.dataService.getLists().subscribe((result) => this.lists = result);
    this.userData = this.dataService.getUserData();
    console.log(this.userData);
  }

  newListClicked() {
    this.newMode = true;
    setTimeout(() => {
      this.newInput.setFocus();
    }), 500;
  }

  editListClicked() {
    console.log('edit list clicked');
    this.editMode = true;
  }

  saveListClicked() {
    console.log('save list clicked');
    if (this.newMode) {
      let newItem = this.dataService.createNewList();
      newItem.title = this.newInput.value;
      this.lists.push(newItem);
      this.newInput.getInputElement().then(value => value.value = '');
    }
    this.dataService.saveList(this.lists).subscribe(resultSave => {
      this.dataService.getLists().subscribe((result) => this.lists = result);
    });
    this.editMode = false;
    this.newMode = false;

  }
  openListItems(id) {
    if (!this.editMode)
      this.router.navigateByUrl(`todos/${id}`);
  }

  removeList(listToRemove: List) {
    this.dataService.removeList(listToRemove, this.lists).subscribe(removeResult => {
      console.log(`Removed = ${removeResult}`);
      this.dataService.getLists().subscribe(retrieveResult => {
        this.lists = retrieveResult;
        console.log(`Updated list ${retrieveResult}`);
      });
    });
  }
}
