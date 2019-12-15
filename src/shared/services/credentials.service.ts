import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TOKEN_STORAGE_NAME } from './config';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

constructor() {
  this.initLogged();
 }

 public isLogged: BehaviorSubject<any> = new BehaviorSubject(null);
 private token: string;

 private initLogged(): void {
   if(this.getToken()) {
     this.isLogged.next(true);
   } else {
     this.isLogged.next(false);
   }
 }

 public saveToken(token: string): void {
     localStorage.setItem(TOKEN_STORAGE_NAME, token);
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(TOKEN_STORAGE_NAME);
    }
    return this.token;
  }

  public deleteToken(): void {
    this.token = null;
    localStorage.removeItem(TOKEN_STORAGE_NAME);
    this.isLogged.next(false);
  }
}
