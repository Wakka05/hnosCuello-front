import { Injectable, Injector } from '@angular/core';

/*LOCALHOST*/
//Two differences because in some servers can't access to localhost, but it can to 127.0.0.1
export const LOCAL_DOMAIN: string = '127.0.0.1';
export const LOCAL_HOST_DOMAIN: string = 'localhost';

/*APP DOMAIN
export const DEV_FRONT_DOMAIN: string = 'dev-front-domain';
export const PRE_FRONT_DOMAIN: string = 'pre-front-domain';
export const PRO_FRONT_DOMAIN: string = 'pro-front-domain';
export const DEV_BACK_DOMAIN: string = 'dev-back-domain';
export const PRE_BACK_DOMAIN: string = 'pre-back-domain';
export const PRO_BACK_DOMAIN: string = 'pro-back-domain';*/

/*ENDPOINT*/
export const END_POINT_DEV: string = 'http://localhost:3000';
export const END_POINT_PRE: string = '';
export const END_POINT_PRO: string = '';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any = null;

  constructor(private injector: Injector) {
    this.load();
  }

  public getConfig(): any {
    return this.config;
  }

  private load(): void {

    const domain: string = window.location.hostname;

    switch (domain) {
      case LOCAL_DOMAIN:
        this.config = {
          API: {
            END_POINT: END_POINT_DEV
            //COOKIE: ???
          }
        };
        break;
      case LOCAL_HOST_DOMAIN:
        this.config = {
          API: {
            END_POINT: END_POINT_DEV
            //COOKIE: ??? -> cookie pre environment
          }
        };
        break;
      default:
        this.config = {
          API: {
            END_POINT: END_POINT_PRE
            //COOKIE: ??? -> cookie pre environment
          }
        }
    }
  }
}
