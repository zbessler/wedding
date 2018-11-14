import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxLogglyModule } from 'ngx-loggly-logger';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';

import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { AngularFireModule } from 'angularfire2';

import { MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatCardModule,
         ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { JapanComponent } from '../japan/japan.component';
import { ErrorComponent } from '../error/error.component';
import { AdminComponent } from '../admin/admin.component';


import { CarouselComponent } from '../../components/carousel/carousel.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AppInputComponent } from '../../components/input/input.component';

import { DashboardService } from '../../factories/dashboard.service';
import { StorageService } from '../../factories/storage.service';
import { GlobalErrorHandler, LogglyLoggerService } from '../../core/error';
import { RouterService } from '../../core/router';

import { AnalyticsService, AnalyticsDirective } from '../../core/analytics';
import { environment } from '../../environments/environment';

declare let ga: Function;
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        JapanComponent,
        ErrorComponent,
        AdminComponent,

        CarouselComponent,
        HeaderComponent,
        FooterComponent,
        AppInputComponent,
        AnalyticsDirective,
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
        NguCarouselModule,
        NgxLogglyModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireFunctionsModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTableModule
    ],
    providers: [
        RouterService,

        DashboardService,
        StorageService,

        LogglyLoggerService,
        AnalyticsService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
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
