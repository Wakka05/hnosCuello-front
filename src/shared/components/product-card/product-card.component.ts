import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ResourceService } from 'src/shared/services/resource.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  public content: string;

  constructor(private router: Router, private resourceService: ResourceService) { }

  ngOnInit() {
    if (this.product.idResource) {
      this.resourceService.getResource(this.product.idResource).subscribe( val => {
        this.content = 'data:image/jpeg;base64,' + val.content;
      });
    }
  }
}
