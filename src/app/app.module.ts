import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule,
   MatFormFieldModule, 
   MatAutocompleteModule, 
   MatIconModule, 
   MatMenuModule, 
   MatButtonModule,
   MatExpansionModule
  } from '@angular/material';

import { HeaderDesktopComponent } from '../shared/components/header-desktop/header-desktop.component';
import { SearchBarComponent } from '../shared/components/search-bar/search-bar.component';
import { HomePage } from '../pages/home-page/home-page.component';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { Base64Pipe } from '../shared/pipes/base64.pipe';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RatingComponent } from '../shared/components/rating/rating.component';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';

//Function to create the loader for translations
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
@NgModule({
  declarations: [
    AppComponent,
    HeaderDesktopComponent,
    SearchBarComponent,
    ProductCardComponent,
    HomePage,
    Base64Pipe,
    FooterComponent,
    RatingComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    /**
     * Aqui van los wards para los admin o roles
     * incluido:
     * CookieService,
     * {
     *  provide: HTTP_INTERCEPTORS,
     *  useClass: GenericErrorHttpInterceptor,
     *  multi: true
     * }
     */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
