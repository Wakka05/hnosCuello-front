import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public users: User[] = [];
  public userId: string;
  private ordersOrb: any[] = [];
  public orders: any[] = [];

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
    console.log(this.userId);
    if (this.userId) {
      if (this.user && this.user.orders && this.user.orders.length !== 0) {
        this.user.orders.forEach( order => {
          this.ordersOrb.push(this.orderService.getOrder(order));
        });
        forkJoin(this.ordersOrb).subscribe( res => {
          this.orders = res;
          console.log(this.orders);
          this.showSpinner = false;
        });
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

  public goToOrder(): void {
    this.router.navigate(['orders', this.user._id]);
  }

}
