import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/models/user';
import { OrderService } from 'src/shared/services/order.service';
import { Observable, of, forkJoin } from 'rxjs';
import { Order } from 'src/shared/models/order';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.less']
})
export class OrderPageComponent implements OnInit {

  public showSpinner = false;
  private user: User;
  public users: User[] = [];
  public userId: string;
  private ordersOrb: any[] = [];
  public orders: any[] = [];
  public finalPrice: string;
  public isConfirmed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.user = this.authService.user.getValue();
    this.userId = this.route.snapshot.paramMap.get('userID');
    if (this.userId) {
      if (this.user && this.user.orders && this.user.orders.length !== 0) {
        this.initOrders();
      } else {
        this.showSpinner = false;
      }
    } else {
      //TODO: Mostrar todos los pedidos
      // Get all users and all their orders
      this.authService.getUsers().subscribe( users => {
        users.forEach(user => {
          if (user.orders && user.orders.length !== 0) {
            this.users.push(user);
          }
        });
        this.showSpinner = false;
      });
    }
  }

  private initOrders(): void {
    this.user.orders.forEach( order => {
      if (order) {
        this.ordersOrb.push(this.orderService.getOrder(order));
      }
    });
    forkJoin(this.ordersOrb).subscribe( res => {
      this.ordersOrb = [];
      this.orders = res;
      this.getFinalPrice();
      this.showSpinner = false;
    });
  }

  private getFinalPrice(): void {
    let price = 0;
    this.orders.forEach( order => {
      price = +(order.finalPrice.replace(',', '.')) + price;
    });
    this.beautyPrice(Math.round(price * 100) / 100);
  }

  beautyPrice(currentPrice: number): void {
    let price = currentPrice.toString();
    // Resultado entero
    if (!price.includes('.')) {
      price = price + ',00';
      // Resultado decimal
    } else {
      let priceFinal = price.replace('.', ',');
      const priceSplit = priceFinal.split(',');
      if (priceSplit[1].length === 1) {
        priceFinal = priceFinal + '0';
      }
      price = priceFinal;
    }
    this.finalPrice = price;
  }

  public goToOrder(): void {
    this.router.navigate(['orders', this.user._id]);
  }

  public removeOrder(order: Order): void {
    const index = this.user.orders.findIndex(val => val === order._id);
    this.user.orders.splice(index, 1);
    this.authService.updateUser(this.user._id, this.user).subscribe( val => {
      this.user = this.authService.getUser();
      this.orderService.deleteOrder(order._id).subscribe(deleted => {
        if (this.user.orders && this.user.orders.length !== 0) {
          this.showSpinner = true;
          this.orders = [];
          this.initOrders();
        }
        // TODO: Spinner? confirm?
      });
    });
  }

  public confirm(): void {
    this.isConfirmed = true;
  }

}
