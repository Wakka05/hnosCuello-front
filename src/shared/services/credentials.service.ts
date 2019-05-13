import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
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

 public saveToken(headers: HttpHeaders): void {
   if(headers && headers.get('Authorization')) {
     const tokenHeader: string = headers.get('Authorization');
     const finalToken: string = tokenHeader.split(' ')[1];
     this.token = finalToken;
     localStorage.setItem(TOKEN_STORAGE_NAME, finalToken);
   }
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_STORAGE_NAME);
  }

  public getHeaderToken(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bread ${token}`}) : null;
  }
  
  public deleteToken(): void {
    this.token = null;
    localStorage.removeItem(TOKEN_STORAGE_NAME);
  }
  
  // Este servicio funcionaria instalando ngx-cookie-service
  // public createCookie(cookie: any): void {
  //   this.deleteCookie();
  //   this.cookieService.set(COOKIE_NAME, cookie, 86400000, '/', this.cookieDomain);
  // }

  // public deleteCookie(): void {
  //   this.cookieService.delete(COOKIE_NAME, '/', this.cookieDomain);
  // }

}
