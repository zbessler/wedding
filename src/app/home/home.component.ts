import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { fill as lofill } from 'lodash/fill';

import { DashboardService } from '../../factories/dashboard.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: []
})


export class HomeComponent {

    public rsvpForm: FormGroup;
    public rsvpText = 'Send RSVP';
    public openState = 'open';

    private scollNum = 0;
    public scrollType = 'base';

    public bg0Opacity = .5;
    public bg1Opacity = 0;
    public fixedTitle = 'fixed';




    @ViewChild('fundingDiv') fundingDiv: ElementRef;
    @ViewChild('peopleContainer') peopleContainer: ElementRef;

    constructor(
        private el: ElementRef,
        private fb: FormBuilder,
        private dashboardService: DashboardService,
    ) {
        this.rsvpForm = fb.group({
            attJapan: [null, []],
            attMaine: [null, []],
            attWis: [null, []],
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email]],
            adultGuests: [null, [Validators.maxLength(50)]],
            childGuests: [null, [Validators.min(0), Validators.max(6)]],
        }, { });

    }


    // The normal email validator forced a value to be entered.
    // This accepts an empty email field
    private customEmailValidator(control: AbstractControl): ValidationErrors {
        if (!control.value) {
            return null;
        }

        return Validators.email(control);
    }

    public setRsvpState(newState: string): void {
        this.openState = newState;
    }

    //
    //  Private Scroll functions
    //

    private fadeHeroOnScroll(number) {
        if (number > 30 && number < 170) {
            const op = number - 30;
            const denom = 300;
            this.bg0Opacity = -(op / denom) + .5;
            this.bg1Opacity = op / denom;
        } else if (number <= 30) {
            this.bg0Opacity = .5;
            this.bg1Opacity = 0;
        } else {
            this.bg0Opacity = 0;
            this.bg1Opacity = .5;
        }

        if (number > 700) {
            this.fixedTitle = 'relative';
        } else {
            this.fixedTitle = 'fixed';
        }
    }



    @HostListener('window:scroll', [])
    onWindowScroll() {

        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        this.fadeHeroOnScroll(number);

        if (number > 200) {
            this.scrollType = 'scrolled';
        } else {
            this.scrollType = 'base';
        }

    }
}
