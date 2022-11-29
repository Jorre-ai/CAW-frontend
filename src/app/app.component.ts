import { Component } from '@angular/core';

import { User } from './_models';


@Component({ selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ["app.component.css"]

})
export class AppComponent {
    showFiller = true;
    user: User;

    constructor() {
        
    }

}