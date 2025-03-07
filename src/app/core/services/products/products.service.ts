import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURL';
import { products } from '../../../shared/interface/products/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productList: products[] = [];

  constructor(private http:HttpClient) { }

  getProducts():Observable<any> {
    return this.http.get<any>( `${baseURL.BaseURL}/products`)
  }

  getProduct(id:string):Observable<any> {
    return this.http.get<any>(`${baseURL.BaseURL}/products/${id}`)
  }
}
