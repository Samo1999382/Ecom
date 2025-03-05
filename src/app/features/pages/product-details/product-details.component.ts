import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { products } from '../../../shared/interface/products/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id!:string;
  productDetails!:products;
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private toastr: ToastrService, private cart: CartService) {
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

  addProduct(productID: string) {
    this.cart.addProductToCart(productID).subscribe({
      next: res => {
        this.toastr.success(res.message, 'Success', {closeButton: true, progressBar: true, timeOut: 2000});
      }
    });
  }
}
