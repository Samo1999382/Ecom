import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Cart } from '../../../shared/interface/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  totalPrice: number = 0;
  products: Cart[] = [];

  constructor(private cart: CartService) {
    this.getCart();
    this.isModalOpen = false;
  }

  getCart(){
    return this.cart.getProductFromCart().subscribe({
      next: res => {
        this.totalPrice = res.data.totalCartPrice;
        this.products = res.data.products;
      }
    });
  }

  updateCart(productId:string, count:number) {
    this.cart.updateProductFromCart(productId, count).subscribe({
      next: res => {
        this.totalPrice = res.data.totalCartPrice;
        this.products = res.data.products;
      }
    });
  }

  removeItem(productId:string) {
    this.cart.removeProductFromCart(productId).subscribe({
      next: res => {
        this.totalPrice = res.data.totalCartPrice;
        this.products = res.data.products;
      }
    });
  }

  clearCart() {
    this.cart.clearCart().subscribe({
      next: res => {
        this.totalPrice = 0;
        this.products = [];
        this.isModalOpen = false;
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
