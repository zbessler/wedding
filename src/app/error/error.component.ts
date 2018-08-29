import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

    constructor(private _location: Location) { }


    public back(): void {
        console.log();
        this._location.back();
    }

}
