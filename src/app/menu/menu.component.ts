import { Component, OnInit } from '@angular/core';
import { List, DataService } from '../data.service';
import { UserData } from 'blockstack/lib/auth/authApp';
import { Router } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  userData: UserData;
  lists: List[];
  editMode: boolean = false;

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.dataService.getLists().subscribe((result) => this.lists = result);
    this.userData = this.dataService.getUserData();
    console.log(this.userData);
  }

  newListClicked() {
    this.lists.push(this.dataService.createNewList());
    this.editMode = true;
  }

  editListClicked() {
    console.log('edit list clicked');
    this.editMode = true;
  }

  saveListClicked() {
    console.log('save list clicked');
    console.log(this.lists);
    this.dataService.saveList(this.lists);
    this.editMode = false;
    this.dataService.getLists().subscribe((result) => this.lists = result);
  }
  openListItems(id) {
    console.log(id);
    this.router.navigateByUrl(`todos/${id}`);
  }
}
