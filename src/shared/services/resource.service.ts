import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { config } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private endPoint: string;

  constructor(private http: HttpClient,
    private configService: ConfigService
    ) { 
    this.endPoint = this.configService.getConfig().API.END_POINT;
  }

  public getResource(idResource: string): Observable<any> {
    const path = `${this.endPoint}${config.resource}/${idResource}`;
    return this.http.get<any>(path, { observe: 'response' })
      .pipe(
        map(res => {
        return res.body;
      }));
  }

}
