import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CredentialsService } from './credentials.service';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private endPoint: string;

  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService,
    private configService: ConfigService
  ) { 
    this.endPoint = this.configService.getConfig();
  }

  public getCategories(orderField?: string, size?: number, page?: number): Observable<any> {
    let path = `${this.endPoint}${config.category}`;

    if(size) {
      path = `${path}&size=${size}`
    }
    if(page) {
      path = `${path}&size=${page}`
    }
    if(orderField) {
      path = `${path}&size=${orderField}`
    }

    const header: HttpHeaders = this.credentialsService.getHeaderToken();
    return this.http.get<any>(path, { headers: header, observe: 'response' })
      .pipe(
        map(res => {
        this.credentialsService.saveToken(res.headers);
        return res.body;
      }));
  }

  public getCategory(idCategory: string): Observable<Category> {
    let path = `${this.endPoint}${config.category}/${idCategory}`;

    const header: HttpHeaders = this.credentialsService.getHeaderToken();
    return this.http.get<Category>(path, { headers: header, observe: 'response' })
      .pipe(
        map(res => {
        this.credentialsService.saveToken(res.headers);
        return res.body;
      }));
  }
}
