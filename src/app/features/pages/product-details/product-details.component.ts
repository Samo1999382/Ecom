import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { products } from '../../../shared/interface/products/products';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id!:string;
  productDetails!:products;
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) {
    activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getProductDetails()
  }

  getProductDetails() {
    this.productsService.getProduct(this.id).subscribe({
      next: res => {
        this.productDetails = res.data
      }
    });
  }
}
