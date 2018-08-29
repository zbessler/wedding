import { Injectable, Directive, ElementRef, HostListener, Input } from '@angular/core';

import { LogglyLoggerService } from './error';

declare let ga: Function;
@Injectable()
export class AnalyticsService {

    public emitEvent(eventCategory: string,
                     eventAction: string,
                     eventLabel: string = null,
                     eventValue: number = null) {
        ga('send', 'event', {
            eventCategory: eventCategory,
            eventLabel: eventLabel,
            eventAction: eventAction,
            eventValue: eventValue
        });
    }

    public emitPageView(url) {
        ga('set', 'page', url);
        ga('send', 'pageview');
    }
}


@Directive({
    selector: '[appAnalytics]'
})
export class AnalyticsDirective {
    constructor(
        private analyticsService: AnalyticsService,
        private logglyService: LogglyLoggerService
    ) {}

    @Input() appAnalytics: string;
    @Input() appAnalyticsHover: string;
    @Input() appAnalyticsBlur: string;

    @HostListener('click', ['$event']) onclick(e) {
        if (!!this.appAnalytics) {
            const data = this.appAnalytics.split('|');
            this.handleAnalyticsData(data);
        }
    }

    @HostListener('mouseover', ['$event']) onhover(e) {
        if (!!this.appAnalyticsHover) {
            const data = this.appAnalyticsHover.split('|');
            this.handleAnalyticsData(data);
        }
    }

    @HostListener('focusout', ['$event']) onblur(e) {
        if (!!this.appAnalyticsBlur) {
            const data = this.appAnalyticsBlur.split('|');
            this.handleAnalyticsData(data);
        }
    }

    private handleAnalyticsData(data) {
        if (data.length < 2) {
            this.logglyService.log(new Error('Missing analytics hover data - ' + this.appAnalyticsHover));
            return ;
        }
        for (let i = data.length; i < 4; i++) {
            data.push(null);
        }
        this.analyticsService.emitEvent(data[0], data[1], data[2], Number(data[3]));
    }
}
