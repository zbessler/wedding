import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireFunctions } from 'angularfire2/functions';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: []
})


export class AdminComponent {

    public summary: any;
    public dataSource: any;
    public displayedColumns: string[] = ['name', 'email', 'attending', 'adults', 'children'];
    @ViewChild(MatSort) sort: MatSort;



    constructor(
        private fun: AngularFireFunctions
    ) {
        this.getSummary();
    }

    public getSummary() {
        const res = this.fun
            .httpsCallable('getSummary')(null)
            .toPromise()
            .then(out => {
                this.summary = out;
                this.dataSource = new MatTableDataSource(out.fullList);
                this.dataSource.sort = this.sort;

                console.log(out);
            })
            .catch(err => {
                console.log('err', err);
            });
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
