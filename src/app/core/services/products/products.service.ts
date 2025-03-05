import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient) { }

  getProducts():Observable<any> {
    return this.http.get<any>( `${baseURL.BaseURL}/products`)
  }

  getProduct(id:string):Observable<any> {
    return this.http.get<any>(`${baseURL.BaseURL}/products/${id}`)
  }
}
