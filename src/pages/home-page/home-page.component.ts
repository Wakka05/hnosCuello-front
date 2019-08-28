import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) { 
    //this.getCategories();
    //this.productService.getProducts
    this.products = [{
      id: '1',
      name: 'pan-1',
      title: 'Pan tipo 1',
      idCategory: '1'
    },
    {
      id: '2',
      name: 'pan-2',
      title: 'Pan tipo 2',
      idCategory: '1'
    }]
  }

  ngOnInit() {

  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe( categories => {
      this.categories = categories;
    });
  }

  public goToProduct(product: Product) {
    this.router.navigate(['category/' + product.idCategory +  '/product/' + product.id]);
  }

}
