import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from './config';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private endPoint: string;
  public categories = new BehaviorSubject<Category[]>(null); 
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { 
    this.endPoint = this.configService.getConfig().API.END_POINT;
  }

  public getCategories(): Observable<Category[]> {
    if (this.categories.getValue()) {
      return this.categories;
    }
    const path = `${this.endPoint}${config.category}`;
    return this.http.get<any>(path, { observe: 'response' })
      .pipe(
        map(res => {
          if (!this.categories.getValue()) this.categories.next(res.body);
          return res.body;
      }));
  }

  public getCategory(idCategory: string): Observable<Category> {
    const path = `${this.endPoint}${config.category}/${idCategory}`;
    return this.http.get<Category>(path, { observe: 'response' })
      .pipe(
        map(res => {
        return res.body;
      }));
  }
}
