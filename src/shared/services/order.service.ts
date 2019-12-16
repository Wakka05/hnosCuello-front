import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { CredentialsService } from './credentials.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from './config';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private endPoint: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.endPoint = this.configService.getConfig().API.END_POINT;
  }

  public getOrder(idOrder: string): Observable<Order> {
    const path: string = `${this.endPoint}${config.order}/${idOrder}`;
    return this.http.get<any>(path, { observe: 'response' })
    .pipe(
      map(res => {
        return res.body;
      })
    );
  }

  public addOrder(order: Order): Observable<any> {
    const path: string = `${this.endPoint}${config.order}/create`;
    return this.http.post<any>(path, order, { observe: 'response' })
    .pipe(
      map(res => {
        return res.body;
      })
    );
  }

  public updateOrder(idOrder: string, order: Order): Observable<any> {
    const path: string = `${this.endPoint}${config.order}/${idOrder}`;
    return this.http.put<any>(path, order, { observe: 'response' })
    .pipe(
      map(res => {
        return res.body;
      })
    );
  }

  public deleteOrder(idOrder: string): Observable<any> {
    const path: string = `${this.endPoint}${config.order}/${idOrder}`;
    return this.http.delete<any>(path, { observe: 'response' })
    .pipe(
      map(res => {
        return res.body;
      })
    );
  }
}
