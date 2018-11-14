import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { DashboardService } from '../../factories/dashboard.service';

@Component({
    templateUrl: './japan.component.html',
    styleUrls: ['./japan.component.scss'],
    animations: []
})


export class JapanComponent {

    public fieldHeader = 'Get notified about the Wedding';
    public btn = {
        text: 'Stay Connected',
        disabled: false
    };
    public state: string[] = Array(5).fill('closed');
    private scollNum = 0;
    public seeAll = false;



    constructor(
    ) {

    }


    public openAccordion(index) {
        this.state[index] = (this.state[index] === 'closed' ? 'open' : 'closed');
    }

}
