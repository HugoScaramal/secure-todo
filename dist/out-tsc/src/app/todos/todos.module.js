import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodosPage } from './todos.page';
var routes = [
    {
        path: '',
        component: TodosPage
    }
];
var TodosPageModule = /** @class */ (function () {
    function TodosPageModule() {
    }
    TodosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TodosPage]
        })
    ], TodosPageModule);
    return TodosPageModule;
}());
export { TodosPageModule };
//# sourceMappingURL=todos.module.js.map