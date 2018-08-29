import { Component, HostListener, Input, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';



@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    animations: [
        trigger('rotatedRight', [
            state('closed', style({ transform: 'rotate(0)' })),
            state('open', style({ transform: 'rotate(-45deg) translate(-5px, 5px)' })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ]),
        trigger('rotatedLeft', [
            state('closed', style({ transform: 'rotate(0)' })),
            state('open', style({ transform: 'rotate(45deg) translate(-5px, -5px)' })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ]),
        trigger('rotatedMiddle', [
            state('closed', style({ transform: 'rotate(0)', opacity: 1 })),
            state('open', style({ transform: 'rotate(45deg)', opacity: 0 })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ]),
        trigger('showMenu', [
            state('closed', style({ visibility: 'hidden', height: 0, transform: 'translateY(-2em)', opacity: 0 })),
            state('open', style({ visibility: 'visible', height: 'auto', transform: 'translateY(0)', opacity: .92 })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in'))
        ])
    ]
})
export class HeaderComponent {

    public menuState = 'closed';
    public loggedIn: boolean;
    @Input() type = 'base';

    constructor(
        private router: Router
    ) {    }

    @HostListener('window:scroll', [])
    onWindowScroll() {

        if (this.type === 'static') {
            return ;
        }
        const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (number > 200) {
            this.type = 'scrolled';
        } else {
            this.type = 'base';
        }

    }

    public toggleMenu() {
        this.menuState = (this.menuState === 'closed' ? 'open' : 'closed');
    }
}
