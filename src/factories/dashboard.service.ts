import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';



@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {}

    // public sendContactMessage(messageData) {
    //     return this.http
    //         .post(API_URL + '/dashboard/contact', messageData)
    //         .toPromise()
    //         .then(data => data)
    //         .catch(err => {
    //             throw err;
    //         });
    // }

}
