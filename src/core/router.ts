import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { JapanComponent } from '../app/japan/japan.component';
import { ErrorComponent } from '../app/error/error.component';


@Injectable()
export class RouterService {

    public static getRoutes(): Routes {
        return [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'japan', component: JapanComponent, pathMatch: 'full' },
            { path: '**', component: ErrorComponent } // @Todo change to 404 page
        ];
    }

}
