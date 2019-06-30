import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List, ListItem, DataService } from '../data.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  listId: string;
  list: List;
  listItems: ListItem[];
  editMode: Boolean = false;
  newMode: Boolean = false;
  @ViewChild('newItemInput') newInput: IonInput;

  constructor(private route: ActivatedRoute,
    private dataService: DataService) {

  }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id');
    if (this.listId) {
      this.dataService.getListItems(this.listId).subscribe(result => {
        this.listItems = result;
      });
      this.dataService.getList(this.listId).subscribe(result => this.list = result);
    }
  }

  newItemClicked() {
    this.newMode = true;
    setTimeout(() => {
      this.newInput.setFocus();
    }), 500;
  }
  editItemClicked() {
    this.editMode = true;
  }

  saveItemClicked() {
    if (this.newMode) {
      let newItem = this.dataService.createNewItem();
      newItem.title = this.newInput.value;
      this.listItems.push(newItem);
      this.newInput.getInputElement().then(value => value.value = '');
    }
    this.dataService.saveListItems(this.list.id, this.listItems).subscribe(resultSave => {
      this.dataService.getList(this.listId).subscribe(result => this.list = result);
    });
    this.editMode = false;
    this.newMode = false;
  }

  removeItem(item: ListItem) {
    this.dataService.removeListItem(this.listId, item, this.listItems).subscribe(resultRemove => {
      this.dataService.getListItems(this.listId).subscribe(resultGetListItems => this.listItems = resultGetListItems)
    });
  }

}
