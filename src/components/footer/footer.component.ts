import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss']
})
export class FooterComponent {

  constructor(
    ) {}

    public signupEmail: string;
    public fieldHeader = 'Get notified about sale details';
    public btn = {
        text: 'Stay Connected',
        disabled: false
    };


    public addToSaleList() {
        this.btn.text = 'Sending...';
        this.btn.disabled = true;
    }
}
