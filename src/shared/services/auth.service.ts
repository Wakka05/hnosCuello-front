import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredentialsService } from './credentials.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, share, flatMap } from 'rxjs/operators';

import { User } from '../models/user';
import { config, USER_STORAGE_NAME } from './config';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, private credentialsService: CredentialsService, private configService: ConfigService,
  private router: Router) {
  this.logged();
  this.endPoint = this.configService.getConfig().API.END_POINT;
 }

 public user: BehaviorSubject<User> = new BehaviorSubject(null);
 public openLoginModal: BehaviorSubject<boolean> = new BehaviorSubject(null);
 private endPoint: string;

 private logged(): void {
   this.credentialsService.isLogged.subscribe(val => {
     if(val === false) {
      this.user.next(null);
     } else {
       this.user.next(jwt_decode(this.credentialsService.getToken()));
     }
   });
 }

 public saveUser(user: User): void {
   this.user.next(user);
   const stringUser = JSON.stringify(user);
   sessionStorage.setItem(USER_STORAGE_NAME, stringUser);
 }

  public getUser(): User {
    return this.user.getValue();
  }

 public getRoles(): string {
   if(this.user.getValue()) {
     return this.user.getValue().roles;
   } else {
     const user = JSON.parse(sessionStorage.getItem(USER_STORAGE_NAME));
     return user ? user.roles : null;
   }
 }

 public login(data: any): Observable<any> {
  const path: string = `${this.endPoint}${config.users}${config.login}`;

  return this.http.post<any>(path, data, { observe: 'response' })
    .pipe(
      map(res => {
        this.credentialsService.saveToken(res.body.token);
        this.user.next(jwt_decode(res.body.token));
        this.credentialsService.isLogged.next(true);
      })
    );
 }

 public registerUser(data: any): Observable<any> {
  const path: string = `${this.endPoint}${config.users}${config.register}`;
  return this.http.post<any>(path, data, { observe: 'response' })
  .pipe(
    map(res => {
      return res.body;
    })
  );
 }

public updateUser(idUser: string, user: User): Observable<any> {
  const path: string = `${this.endPoint}${config.users}/${idUser}`;
  return this.http.put<any>(path, user, { observe: 'response' })
  .pipe(
    map(res => {
      console.log(res);
      this.user.next(res.body);
      return res.body;
    })
  );
}

 public logout(): void {
   this.credentialsService.deleteToken();
   this.router.navigateByUrl('/');
 }

 public getUsers(): Observable<User[]> {
  const path: string = `${this.endPoint}${config.users}`;
  return this.http.get<any>(path, { observe: 'response' })
  .pipe(
    map(res => {
      console.log(res.body);
      return res.body;
    })
  );
 }

}
