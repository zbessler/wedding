import { Component, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fill as lofill } from 'lodash/fill';

import { DashboardService } from '../../factories/dashboard.service';

@Component({
    templateUrl: './japan.component.html',
    styleUrls: ['./japan.component.scss'],
    animations: [
        trigger('rotatedState', [
            state('closed', style({ transform: 'rotate(0)' })),
            state('open', style({ transform: 'rotate(90deg)' })),
            transition('closed => open', animate('200ms linear')),
            transition('open => closed', animate('200ms linear'))
        ]),
        trigger('openState', [
            state('closed', style({ height: '0px', padding: '0px 20px' })),
            state('open', style({ height: 'fit-content', padding: '20px' })),
            transition('closed => open', animate('200ms ease-out')),
            transition('open => closed', animate('200ms ease-in'))
        ]),
        trigger('raiseHex', [
            state('up', style({ top: '-6px', 'box-shadow': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' })),
            state('down', style({top: '0px', 'box-shadow': 'none'})),
            transition('* => *', animate('500ms ease-out'))
        ]),
        trigger('raiseHexOffset', [
            state('up', style({ top: '94px', 'box-shadow': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' })),
            state('down', style({top: '100px', 'box-shadow': 'none'})),
            transition('* => *', animate('500ms ease-out'))
        ])
    ]
})


export class JapanComponent {
    public loggedIn: boolean;
    public contactForm: FormGroup;
    public sendBtnText = 'Send';

    public signupEmail: string;
    public error: string;
    public fieldHeader = 'Get notified about the Wedding';
    public btn = {
        text: 'Stay Connected',
        disabled: false
    };
    public state: string[] = Array(5).fill('closed');
    public hexCountNorm: string[] = Array(8).fill('down');
    public hexCountOffset: string[] = Array(8).fill('down');
    private scollNum = 0;
    public seeAll = false;
    public seeAllBtnTxt = 'See All';



    constructor(
        private fb: FormBuilder,
        private dashboardService: DashboardService,
        private el: ElementRef
    ) {
        this.contactForm = fb.group({
            name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email]],
            subject: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            message: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        }, { });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {

        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const check = Math.floor(number / 250);
        if (check !== this.scollNum) {
            this.scollNum = check;
            this.hexCountNorm = Array(8).fill('down');
            this.hexCountOffset = Array(8).fill('down');
            const randNorm = Math.floor(Math.random() * 8);
            const randOff = Math.floor(Math.random() * 8);
            this.hexCountNorm[randNorm] = 'up';
            this.hexCountOffset[randOff] = 'up';
        }

    }

    public openAccordion(index) {
        this.state[index] = (this.state[index] === 'closed' ? 'open' : 'closed');
    }

    public toggleSeeAll() {
        this.seeAll = !this.seeAll;
        if (this.seeAll) {
            this.seeAllBtnTxt = 'See Less';
        } else {
            this.seeAllBtnTxt = 'See All';
        }
    }

    public sendMessage() {
         let formErrors = false;
        (<any>Object).values(this.contactForm.controls).forEach(c => {
            c.markAsTouched();
            if (c.errors) {
                formErrors = true;
            }
        });
        if (formErrors) {
            this.sendBtnText = 'Try Again';
            return ;
        }

        this.sendBtnText = 'Sending...';
        const messageData = {
            name: this.contactForm.get('name').value,
            email: this.contactForm.get('email').value,
            subject: this.contactForm.get('subject').value,
            body: this.contactForm.get('message').value
        };

    }
}
