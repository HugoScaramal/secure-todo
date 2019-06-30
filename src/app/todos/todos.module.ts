import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodosPage } from './todos.page';


const routes: Routes = [
  {
    path: '',
    component: TodosPage
  },
  { path: ':id', component: TodosPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodosPage]
})
export class TodosPageModule { }
