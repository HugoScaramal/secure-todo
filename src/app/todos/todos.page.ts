import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
listId:string;
  constructor(private route:ActivatedRoute) { 

  }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('id');
    if(this.listId){
      //Load data
   }
  }

  todoChanged() {
    console.log('list changed');
  }

}
