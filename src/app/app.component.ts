import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private categoryService: CategoryService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  onActivate(event): void {
    window.scroll(0, 0);
  }
}
