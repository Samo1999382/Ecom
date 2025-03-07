import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { products } from '../../../shared/interface/products/products';
import { CurrencyPipe } from '@angular/common';
import { FilterPipe } from '../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, FilterPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService, private cart:CartService, private toastr: ToastrService, private wish: WishListService) { }

  productList: products[] = [];
  wishList: Array<string> = [];
  searchValue:string = '';
  isLoading: boolean = true;

  ngOnInit() {
    if(this.productsService.productList.length === 0){
      this.getAllProducts();
      this.getWishList();
    }else{
      this.productList = this.productsService.productList;
      this.isLoading = false;
      this.wishList = this.wish.wishList
    }
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe( {
      next: res =>{
        this.productList = res.data;
        this.productsService.productList = res.data;
      },
      complete: () => {
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

  getWishList(){
    this.wish.getProductFromWishList().subscribe({
      next: res => {
        this.wishList = res.data.map((product: any) => product._id)
        this.wish.wishListProducts = res.data
        this.wish.wishList = this.wishList
      }
    })
  }

  addToWishList(productId: string) {
    this.wishList.push(productId)
    this.wish.addProductToWishList(productId).subscribe({
      next: () => {
        this.wish.wishList = this.wishList
      },
      error: () => {
        this .wishList = this.wishList.filter(item => item !== productId)
      }
    })
  }

  removeFromWishList(productId: string){
    this.wishList = this.wishList.filter(item => item !== productId)
    this.wish.removeProductFromWishList(productId).subscribe({
      next: () => {
        this.wish.wishList = this.wishList
      },
      error: () => {
        this.wishList.push(productId)
      }
    })
  }
}
