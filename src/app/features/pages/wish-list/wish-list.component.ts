import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Cart } from '../../../shared/interface/cart';
import { CurrencyPipe } from '@angular/common';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { products } from '../../../shared/interface/products/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
    wishList: Array<string> = [];
    wishListProducts: products[] = [];
    isLoading:boolean = true;

    constructor(private cart: CartService, private wish: WishListService) {
      this.wishListProducts = this.wish.wishListProducts;
      if(this.wishListProducts.length !== 0){
        this.isLoading = false;
      }
      this.wish.getProductFromWishList().subscribe({
        next: res => {
          this.wishListProducts = res.data;
        },
        complete: ()=>{
          this.isLoading = false;
        }
      });
      if(this.wishListProducts.length === 0 || this.wishListProducts.length !== this.wish.wishList.length){
        this.getWishList();
      }
    }

    getWishList(){
      return this.wish.getProductFromWishList().subscribe({
        next: res => {
          this.wishListProducts = res.data;
          this.wish.wishListProducts = this.wishListProducts;
        }
      });
    }

    removeFromWishList(productId: string){
      this.wishList = this.wishList.filter(item => item !== productId)
      this.wish.removeProductFromWishList(productId).subscribe({
        next: () => {
          this.getWishList()
        },
        error: () => {
          this.wishList.push(productId)
        }
      })
    }
}
