import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DataService } from '../data.service';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(dataService) {
        this.dataService = dataService;
        this.editMode = false;
    }
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getLists().subscribe(function (result) { return _this.lists = result; });
        this.userData = this.dataService.getUserData();
        console.log(this.userData);
    };
    MenuComponent.prototype.newListClicked = function () {
        this.lists.push(this.dataService.createNewList());
        this.editMode = true;
    };
    MenuComponent.prototype.listChanged = function () {
        this.dataService.saveList(this.lists);
    };
    MenuComponent.prototype.editListClicked = function () {
        console.log('edit list clicked');
        this.editMode = true;
    };
    MenuComponent.prototype.saveListClicked = function () {
        console.log('save list clicked');
        this.editMode = false;
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [DataService])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map