import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CredentialsService } from './credentials.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private endPoint: string;

  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService,
    private configService: ConfigService
  ) { 
    this.endPoint = this.configService.getConfig().API.END_POINT;
  }

  public getProducts(idCategory: string, orderField?: string, size?: number, page?: number): Observable<Product[]> {
    let path = `${this.endPoint}${config.product}/${idCategory}`;

    /*if(size) {
      path = `${path}&size=${size}`
    }*/
    if(page) {
      path = `${path}&page=${page}`
    }
    if(orderField) {
      path = `${path}&orderField=${orderField}`
    }

    const header: HttpHeaders = this.credentialsService.getHeaderToken();
    return this.http.get<any>(path, { headers: header, observe: 'response' })
      .pipe(
        map(res => {
        this.credentialsService.saveToken(res.headers);
        return res.body;
      }));
  }

  public getProduct(idProduct: string): Observable<Product> {
    let path = `${this.endPoint}${config.product}/${idProduct}`;

    const header: HttpHeaders = this.credentialsService.getHeaderToken();
    return this.http.get<Product>(path, { headers: header, observe: 'response' })
      .pipe(
        map(res => {
        this.credentialsService.saveToken(res.headers);
        return res.body;
      }));
  }

}
