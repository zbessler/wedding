import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { NgxLogglyModule } from 'ngx-loggly-logger';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { JapanComponent } from '../japan/japan.component';
import { ErrorComponent } from '../error/error.component';


import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AppInputComponent } from '../../components/input/input.component';

import { DashboardService } from '../../factories/dashboard.service';
import { StorageService } from '../../factories/storage.service';
import { GlobalErrorHandler, LogglyLoggerService } from '../../core/error';
import { RouterService } from '../../core/router';
import { ScrollService } from '../../components/inViewport/scroll.service';

import { AnalyticsService, AnalyticsDirective } from '../../core/analytics';
import { AnimateOnScrollDirective } from '../../components/inViewport/animate-on-scroll.directive';
import { environment } from '../../environments/environment';

declare let ga: Function;
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        JapanComponent,
        ErrorComponent,

        CarouselComponent,
        HeaderComponent,
        FooterComponent,
        AppInputComponent,
        AnalyticsDirective,
        AnimateOnScrollDirective
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
          RouterService.getRoutes(),
          { errorHandler: null }
          // { enableTracing: true } // <-- debugging purposes only
        ),
        NgxCarouselModule,
        NgxLogglyModule.forRoot(),
        RecaptchaModule.forRoot()
    ],
    providers: [
        RouterService,

        DashboardService,
        StorageService,
        ScrollService,

        LogglyLoggerService,
        AnalyticsService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private router: Router,
        private analyticsService: AnalyticsService,
    ) {
        ga('create', environment.analyticsId, 'auto');

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }
}
