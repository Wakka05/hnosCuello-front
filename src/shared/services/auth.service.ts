import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredentialsService } from './credentials.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { User } from '../models/user';
import { config, USER_STORAGE_NAME } from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, private credentialsService: CredentialsService) {
  this.logged();
  this.endPoint = 'dirección mongoDB';
  //this.getUser().subscribe();
 }

 public user: BehaviorSubject<User> = new BehaviorSubject(null);
 private endPoint: string;
 private userObs: Observable<User>;


 private logged(): void {
   this.credentialsService.isLogged.subscribe(val => {
     if(val === false) 
      this.user = new BehaviorSubject(null);
   })
 }

 public saveUser(user: User): void {
   this.user.next(user);
   const stringUser = JSON.stringify(user);
   sessionStorage.setItem(USER_STORAGE_NAME, stringUser);
 }

 public getUser(): Observable<User> {
   const savedUser = sessionStorage.getItem(USER_STORAGE_NAME);
   if (savedUser) {
    return of(JSON.parse(savedUser));
   } else {
    if(this.credentialsService.getToken()) {
      const path: string = `${this.endPoint}${config.users}${config.logged}`;
      const header: HttpHeaders = this.credentialsService.getHeaderToken();
      this.userObs = this.http.get<any>(path, { headers: header, observe: 'response' })
      .pipe(
        map(res => {
          const returnUser = res.body;
          this.saveUser(returnUser);
          this.credentialsService.saveToken(res.headers);
          //this.credentialsService.createCookie(returnUser.tokenCookie);
          return returnUser;
        }),
        share())
    } else {
      return of(null);
    }
    return this.userObs;
  }
 }

 public getRoles(): string[] {
   if(this.user.getValue()) {
     return this.user.getValue().roles;
   } else {
     const user = JSON.parse(sessionStorage.getItem(USER_STORAGE_NAME));
     return user ? user.roles : null;
   }
 }

 /**
  * Hacer funciones isViewOnly... isAdmin... etc en este servicio
  */

}