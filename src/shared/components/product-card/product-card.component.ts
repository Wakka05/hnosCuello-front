import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  private goToProduct(): void {
    this.router.navigate(['category', this.product.idCategory, this.product.name]);
  }

}
