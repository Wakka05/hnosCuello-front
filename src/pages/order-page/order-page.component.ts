import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/models/user';
import { OrderService } from 'src/shared/services/order.service';
import { Observable, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.less']
})
export class OrderPageComponent implements OnInit {

  public showSpinner = false;
  private user: User;
  private ordersOrb: any[] = [];
  private orders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.showSpinner = true;
    this.user = this.authService.user.getValue();
    if (this.user && this.user.orders && this.user.orders.length !== 0) {
      this.user.orders.forEach( order => {
        this.ordersOrb.push(this.orderService.getOrder(order));
      });
      forkJoin(this.ordersOrb).subscribe( res => {
        this.orders = res;
        this.showSpinner = false;
      });
    }
  }

}
