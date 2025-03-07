import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../constant/baseURL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${baseURL.BaseURL}/categories`)
  }
}
