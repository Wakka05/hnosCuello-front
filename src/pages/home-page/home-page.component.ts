import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePage implements OnInit {

  public products: Product[];
  public categories: Category[];

  constructor(private categoryService: CategoryService, private productService: ProductService) { 
    //this.getCategories();
    //this.productService.getProducts
  }

  ngOnInit() {

  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe( categories => {
      this.categories = categories;
    });
  }

}
