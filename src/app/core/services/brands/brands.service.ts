import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  getAllBrands():Observable<any> {
    return this.http.get(`${baseURL.BaseURL}/brands`)
  }
}
