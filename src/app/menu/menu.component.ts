import { Component, OnInit } from '@angular/core';
import { List, DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  lists: List[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.lists = this.dataService.getLists();
  }

}
