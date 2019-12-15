import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/shared/services/auth.service';
import { CredentialsService } from 'src/shared/services/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private credentials: CredentialsService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.credentials.isLogged.subscribe();
  }

  onActivate(event): void {
    window.scroll(0, 0);
  }

  logout(event): void {
    this.authService.logout();
  }
}
