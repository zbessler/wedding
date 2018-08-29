import { ErrorHandler, Injectable, Inject, forwardRef, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { LogglyService } from 'ngx-loggly-logger';

import { environment } from '../environments/environment';


@Injectable()
export class LogglyLoggerService {

    constructor(private _logglyService: LogglyService) {
        this._logglyService.push({
            logglyKey: environment.logglyJsKey,
            sendConsoleErrors: true,
            tag: 'angular-web'
        });
    }

    public log(error: Error ) {
        console.log(error);
        this._logglyService.push({ message: error.message, stack: error.stack });
    }
}

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(
        private logglyService: LogglyLoggerService,
        private inj: Injector
        // private router: Router
    ) {
        super();
    }

    handleError(error) {
        const router = this.inj.get(Router);
        router.navigate(['error'], { })
            .then(data => console.log('THEN', data)) // Route was success
            .catch(data => console.log('catch', data));
        this.logglyService.log(error);
    }
}

