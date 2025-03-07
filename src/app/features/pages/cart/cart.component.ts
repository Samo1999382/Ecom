import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Cart } from '../../../shared/interface/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  totalPrice: number = 0;
  products: Cart[] = [];
  temp: Cart[] = [];
  isLoading:boolean = true;
  cartId!: string

  constructor(private cart: CartService) {
    this.products = this.cart.products;
    this.totalPrice = this.cart.totalPrice;
    this.cartId = this.cart.cartId;
    if(this.products.length !== 0){
      this.isLoading = false;
    }
    this.cart.getProductFromCart().subscribe({
      next: res => {
        this.temp = res.data.products;
      },
      complete: ()=>{
        this.isLoading = false;
      }
    });
    if(this.products.length === 0 || this.temp !== this.cart.products){
      this.getCart();
      this.isModalOpen = false;
    }
  }

  getCart(){
    return this.cart.getProductFromCart().subscribe({
      next: res => {
        this.totalPrice = res.data.totalCartPrice;
        this.products = res.data.products;
        this.cart.products = res.data.products;
        this.cart.totalPrice = res.data.totalCartPrice;
        this.cartId = res.cartId
        this.cart.cartId = this.cartId;
      }
    });
  }

  updateCart(productId:string, count:number) {
    this.cart.updateProductFromCart(productId, count).subscribe({
      next: res => {
        this.totalPrice = res.data.totalCartPrice;
        this.products = res.data.products;
        this.cart.products = res.data.products;
        this.cart.totalPrice = res.data.totalCartPrice;
      }
    });
  }

  removeItem(productId:string) {
    this.cart.removeProductFromCart(productId).subscribe({
      next: res => {
        this.totalPrice = res.data.totalCartPrice;
        this.products = res.data.products;
        this.cart.products = res.data.products;
        this.cart.totalPrice = res.data.totalCartPrice;
      }
    });
  }

  clearCart() {
    this.cart.clearCart().subscribe({
      next: res => {
        this.totalPrice = 0;
        this.products = [];
        this.isModalOpen = false;
        this.cart.products = this.products;
        this.cart.totalPrice = this.totalPrice;
      }
    });
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
