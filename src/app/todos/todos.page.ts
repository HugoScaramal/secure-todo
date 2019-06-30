import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List, ListItem, DataService } from '../data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  listId: string;
  list: List;
  listItems: ListItem[];

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
}
