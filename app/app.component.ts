import { Component, OnInit } from '@angular/core';

import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
})

export class AppComponent implements OnInit {
    constructor(private appService: AppService) { }
    pricelist: any;

    ngOnInit() {
        this.appService.getPriceList().subscribe(d => {
            this.pricelist = d.pricelist;
        });
    }
    previous: any;
    over(e: Element) {
        var bottomtriangle = '<div id="bottomtriangle"></div>';
        var uptriangle = '<div id="uptriangle"></div>';
        var description = "";

        //fix for fast mouse moving
        if (this.previous != null) {
            while (this.previous.children.length > 1)
                this.previous.removeChild(this.previous.lastChild);
        }
        this.previous = e;
        this.appService.getPriceList().subscribe(d => {
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
                    } else {
                        e.insertAdjacentHTML('beforeend', uptriangle);
                    }

                }
            }

        });
    }

    fover(e: Element) {
        if (e.children.length > 1) {
            e.removeChild(e.lastChild);
            e.removeChild(e.lastChild);
        }
    }
}

function getDescription(pricelist: any) {
    if (pricelist.description != "") {
        return pricelist.description;
    }
    else if (pricelist.description_ru != "") {
        return pricelist.description_ru;
    } else {
        return "<div></div>Information not found!";
    }
}
