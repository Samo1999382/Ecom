import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { products } from '../../../shared/interface/products/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id!:string;
  productDetails!:products;
  isLoading:boolean = true;
  imageLoading: boolean = true;

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
      },
      complete: ()=>{
        this.isLoading = false;
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

  onImageLoad(): void {
    this.imageLoading = false;
  }
}
