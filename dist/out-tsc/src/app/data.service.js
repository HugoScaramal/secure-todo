import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as blockstack from "blockstack";
import { makeUUID4 } from 'blockstack';
import { from } from 'rxjs';
var DataService = /** @class */ (function () {
    function DataService() {
        this.appConfig = new blockstack.AppConfig();
        this.userSession = new blockstack.UserSession({ appConfig: this.appConfig });
        this.useEncryption = true;
    }
    DataService.prototype.getLists = function () {
        return from(this.userSession.getFile('/lists.json', { decrypt: this.useEncryption })
            .then(function (fileContents) {
            if (fileContents) {
                return JSON.parse(fileContents);
            }
            else {
                return [];
            }
        }));
    };
    DataService.prototype.saveList = function (list) {
        this.userSession.putFile('/lists.json', JSON.stringify(list), { encrypt: this.useEncryption })
            .then(function (res) {
            console.log('saved list');
            return true;
        }).catch();
    };
    DataService.prototype.signIn = function () {
        var _this = this;
        if (this.userSession.isUserSignedIn()) {
            this.userData = this.userSession.loadUserData();
            this.userProfile = new blockstack.Person(this.userData)._profile;
        }
        else if (this.userSession.isSignInPending()) {
            this.userSession.handlePendingSignIn().then(function (userData) {
                _this.userData = userData;
                _this.userData = _this.userSession.loadUserData();
                _this.userProfile = new blockstack.Person(_this.userData)._profile;
            });
        }
        else {
            this.userSession.redirectToSignInWithAuthRequest();
        }
    };
    DataService.prototype.getUserData = function () {
        return this.userData;
    };
    DataService.prototype.createNewList = function () {
        return { title: '', items: [], id: makeUUID4() };
    };
    DataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
export { DataService };
var List = /** @class */ (function () {
    function List() {
    }
    return List;
}());
export { List };
var ListItem = /** @class */ (function () {
    function ListItem() {
    }
    return ListItem;
}());
export { ListItem };
//# sourceMappingURL=data.service.js.map