import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURL';
import { products } from '../../../shared/interface/products/products';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  token: any;
  wishList: any[] = [];
  wishListProducts: products[] = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id:object) {
    if(isPlatformBrowser(Id)){
           this.token = {token: localStorage.getItem('userToken') || ''};
        }
  }

  addProductToWishList(productID: string): Observable<any> {
      return this.http.post(`${baseURL.BaseURL}/wishlist`,
        {productId: productID},
        {
          headers: this.token
        });
    }

    getProductFromWishList(): Observable<any> {
      return this.http.get(`${baseURL.BaseURL}/wishlist`,
        {
          headers: this.token
        });
    }

    removeProductFromWishList(productID: string): Observable<any> {
      return this.http.delete(`${baseURL.BaseURL}/wishlist/${productID}`,
        {
          headers: this.token
        });
    }
}
