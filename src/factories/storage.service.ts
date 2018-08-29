import { Injectable } from '@angular/core';


@Injectable()
export class StorageService {

    constructor() {}
    private static token: string;

    public setStorage(key, data): void {
        localStorage.setItem(key, JSON.stringify(data));
    }
    public getStorage(key): any {
        return JSON.parse(localStorage.getItem(key));
    }
    public setToken(value): string {
        this.setStorage('token', value);
        return value;
    }
    public getToken(): string {
        if (StorageService.token) {
            return StorageService.token;
        } else {
            const t = this.getStorage('token');
            StorageService.token = t;
            return t;
        }
    }

    public logout(): void {
        StorageService.token = null;
        this.setToken(null);
    }
}
