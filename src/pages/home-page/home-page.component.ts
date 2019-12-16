import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePage implements OnInit {

  public products: Product[][];
  public categories: Category[];
  public showSpinner: boolean;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      const categoryData = [];
      this.categories.forEach( category => {
        categoryData.push(this.productService.getProducts(category._id, null, 8, null));
      });
      forkJoin(categoryData).subscribe( products => {
        this.products = products;
        this.showSpinner = false;
      });
    });
  }

  public goToProduct(product: Product) {
    this.router.navigate(['category/' + product.idCategory +  '/product/' + product._id]);
  }
}
