import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURL';
import { isPlatformBrowser } from '@angular/common';
import { Cart } from '../../../shared/interface/cart';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token: any;
  totalPrice: number = 0;
  products: Cart[] = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id:object, private auth:AuthService) {
    if(isPlatformBrowser(Id)){
       this.token = {token: localStorage.getItem('userToken') || ''};
    }
  }

  addProductToCart(productID: string): Observable<any> {
    return this.http.post(`${baseURL.BaseURL}/cart`,
      {productId: productID},
      {
        headers: this.token
      });
  }

  getProductFromCart(): Observable<any> {
    return this.http.get(`${baseURL.BaseURL}/cart`,
      {
        headers: this.token
      });
  }

  updateProductFromCart(productID: string, count:number): Observable<any> {
    return this.http.put(`${baseURL.BaseURL}/cart/${productID}`,
      {count: count},
      {
        headers: this.token
      });
  }

  removeProductFromCart(productID: string): Observable<any> {
    return this.http.delete(`${baseURL.BaseURL}/cart/${productID}`,
      {
        headers: this.token
      });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${baseURL.BaseURL}/cart`,
      {
        headers: this.token
      });
  }

  checkOut(data: any):Observable<any> {
    return this.http.post(`${baseURL.BaseURL}/orders/checkout-session/${this.auth.userId}?url=http://192.168.1.3:4200`,
      {
        shippingAddress: data
      }
    )
  }
}
