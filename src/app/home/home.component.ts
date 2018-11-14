import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { AngularFireFunctions } from 'angularfire2/functions';

import { StorageService } from '../../factories/storage.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: []
})


export class HomeComponent {

    public rsvpForm: FormGroup;
    public rsvpText = 'Send RSVP';
    public openState = false;

    private scollNum = 0;
    public scrollType = 'base';

    public bg0Opacity = .5;
    public bg1Opacity = 0;
    public fixedTitle = 'fixed';



    constructor(
        private fb: FormBuilder,
        private fun: AngularFireFunctions,
        private storage: StorageService
    ) {

        this.rsvpForm = fb.group({
            attending: [null, [Validators.required]],
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email]],
            adults: [null, [Validators.required, Validators.min(1), Validators.max(6), Validators.pattern('[0-9]*')]],
            children: [null, [Validators.min(0), Validators.max(6), Validators.pattern('[0-9]*')]],
        }, { });

        const savedData = this.storage.getStorage('rsvp-data');
        if (savedData) {
            this.rsvpForm.get('name').setValue(savedData.name);
            this.rsvpForm.get('email').setValue(savedData.email);
            this.rsvpForm.get('adults').setValue(savedData.adults);
            this.rsvpForm.get('children').setValue(savedData.children);
            this.rsvpForm.get('attending').setValue(savedData.attending);
            this.rsvpText = 'Update RSVP';
        }

    }

    public sendForm() {
        let formErrors = false;
        (<any>Object).values(this.rsvpForm.controls).forEach(c => {
            c.markAsDirty();
            if (c.errors) {
                formErrors = true;
                return ;
            }
        });
        if (formErrors) {
            this.rsvpText = 'Try Again';
            return ;
        }
        this.rsvpText = 'Sending...';


        const guestData = {
            name: this.rsvpForm.get('name').value,
            email: this.rsvpForm.get('email').value,
            adults: this.rsvpForm.get('adults').value,
            children: this.rsvpForm.get('children').value,
            attending: this.rsvpForm.get('attending').value
        };
        if (!guestData.children) {
            guestData.children = 0;
        }
        console.log('sending this', guestData);
        this.storage.setStorage('rsvp-data', guestData);

        const res = this.fun
            .httpsCallable('addGuest')(guestData)
            .toPromise()
            .then(out => {
                this.toggleRsvp();
                this.rsvpText = 'RSVP Received';
                console.log(out);
            })
            .catch(err => {
                console.log('err', err);
                this.rsvpText = 'Error: try again later';
            });
    }

    public getSummary() {
        const res = this.fun
            .httpsCallable('getSummary')(null)
            .toPromise()
            .then(out => {
                console.log(out);
            })
            .catch(err => {
                console.log('err', err);
            });
    }


    public toggleRsvp(): void {
        this.openState = !this.openState;
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
