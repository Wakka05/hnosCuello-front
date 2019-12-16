import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/shared/services/product.service';
import { Product } from 'src/shared/models/product';
import { OrderService } from 'src/shared/services/order.service';
import { Order } from 'src/shared/models/order';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/models/user';
import { ResourceService } from 'src/shared/services/resource.service';

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
  private user: User;
  public content: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService,
    private resourceService: ResourceService
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
    this.authService.user.subscribe( val => {
      this.user = val;
    });
  }

  private initData(): void {
    this.productService.getProduct(this.productId).subscribe( val => {
      this.product = val;
      if (this.product.idResource) {
        this.resourceService.getResource(this.product.idResource).subscribe( data => {
          this.content = 'data:image/jpeg;base64,' + data.content;
          this.showSpinner = false;
        });
      } else {
        this.showSpinner = false;
      }
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

  public addOrder(): void {
    const order: Order = {
      product: this.product,
      quantity: this.quantityForm.value
    };
    if (this.user) {
      // if (this.user.orders && this.user.orders.length !== 0) {
      //   this.orderService.updateOrder(this.user.idOrder, order).subscribe( val => {
      //     console.log(val);
      //   });
      // } else {
        this.orderService.addOrder(order).subscribe( newOrder => {
          // val._id -> id del carrito
          if (!this.user.orders) {
            this.user.orders = [];
          }
          this.user.orders.push(newOrder._id);
          console.log(this.user);
          this.authService.updateUser(this.user._id, this.user).subscribe( updated => {
            console.log(updated);
          });
        });
      // }
    } else {
      console.log('Modal de debes de registrarte antes');
    }
  }
}
