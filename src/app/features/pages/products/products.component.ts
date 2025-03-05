import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { products } from '../../../shared/interface/products/products';
import { CurrencyPipe } from '@angular/common';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, FilterPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService, private cart:CartService, private toastr: ToastrService) { }

  productList: products[] = [];
  searchValue:string = '';

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe( {
      next: res =>{
        this.productList = res.data;
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
