import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'menu', component: MenuComponent },
  { path: 'todos', loadChildren: './todos/todos.module#TodosPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
