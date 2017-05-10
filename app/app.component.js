"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("./app.service");
var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getPriceList().subscribe(function (d) {
            _this.pricelist = d.pricelist;
        });
    };
    AppComponent.prototype.over = function (e) {
        var bottomtriangle = '<div id="bottomtriangle"></div>';
        var uptriangle = '<div id="uptriangle"></div>';
        var description = "";
        //fix for fast mouse moving
        if (this.previous != null) {
            while (this.previous.children.length > 1)
                this.previous.removeChild(this.previous.lastChild);
        }
        this.previous = e;
        this.appService.getPriceList().subscribe(function (d) {
            for (var i = 0; i < d.pricelist.length; i++) {
                if (e.getAttribute("id") == "item" + i) {
                    description =
                        '<div id="desc" class="description">' +
                            getDescription(d.pricelist[i]) + '</div>';
                    e.insertAdjacentHTML('beforeend', description);
                    var descr = document.getElementById("desc");
                    // delete localnameDIV
                    descr.removeChild(descr.firstChild);
                    // if description bottom more then height of screen => change margin
                    if (window.innerHeight < descr.getBoundingClientRect().bottom) {
                        descr.style.marginTop = "-" + (descr.clientHeight + 40) + "px";
                        e.insertAdjacentHTML('beforeend', bottomtriangle);
                    }
                    else {
                        e.insertAdjacentHTML('beforeend', uptriangle);
                    }
                }
            }
        });
    };
    AppComponent.prototype.fover = function (e) {
        if (e.children.length > 1) {
            e.removeChild(e.lastChild);
            e.removeChild(e.lastChild);
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html',
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppComponent);
exports.AppComponent = AppComponent;
function getDescription(pricelist) {
    if (pricelist.description != "") {
        return pricelist.description;
    }
    else if (pricelist.description_ru != "") {
        return pricelist.description_ru;
    }
    else {
        return "<div></div>Information not found!";
    }
}
//# sourceMappingURL=app.component.js.map