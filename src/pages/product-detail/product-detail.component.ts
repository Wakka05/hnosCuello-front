import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/shared/services/category.service';
import { ProductService } from 'src/shared/services/product.service';
import { Product } from 'src/shared/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {

  private categoryId: string;
  private productId: string;
  public product: Product;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
    ) { 
    if (this.route.children.length > 0) {
      this.route.children[0].params.subscribe(params => {
        this.productId = params.productID;
      });
    }
    this.categoryId = this.route.snapshot.paramMap.get('categoryID');
  }

  ngOnInit() {
    //this.initData();
  }

  private initData(): void {
    this.productService.getProduct(this.productId).subscribe( val => {
      this.product = val;
    });
  }

}
