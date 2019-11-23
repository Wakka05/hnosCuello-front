import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
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
  protected quantityForm = new FormControl(1);
  public showSpinner: boolean;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
    ) { 
    this.categoryId = this.route.snapshot.paramMap.get('categoryID');
    if (this.route.children.length > 0) {
      this.route.children[0].params.subscribe(params => {
        this.productId = params.productID;
        this.showSpinner = true;
        this.initData();
      });
    }
  }

  ngOnInit() {
  }

  private initData(): void {
    this.productService.getProduct(this.productId).subscribe( val => {
      this.product = val;
      this.showSpinner = false;
    });
  }

  public removeProduct(event): void {
    if (this.quantityForm.value > 1) {
      this.quantityForm.setValue(this.quantityForm.value - 1);
    }
  }

  public addProduct(event): void {
    this.quantityForm.setValue(this.quantityForm.value + 1);
  }

}
