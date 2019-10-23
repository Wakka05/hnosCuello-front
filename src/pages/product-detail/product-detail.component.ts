import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  protected detailForm = new FormGroup({});

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder
    ) { 
    if (this.route.children.length > 0) {
      this.route.children[0].params.subscribe(params => {
        this.productId = params.productID;
      });
    }
    this.categoryId = this.route.snapshot.paramMap.get('categoryID');
    this.detailForm = fb.group({
      'quantity': [1]
    });
  }

  ngOnInit() {
    //this.initData();
  }

  private initData(): void {
    this.productService.getProduct(this.productId).subscribe( val => {
      this.product = val;
    });
  }

  public removeProduct(event): void {
    if (this.detailForm.controls.quantity.value > 1) {
      this.detailForm.controls.quantity.setValue(this.detailForm.controls.quantity.value - 1);
    }
  }

  public addProduct(event): void {
    this.detailForm.controls.quantity.setValue(this.detailForm.controls.quantity.value + 1);
  }

}
