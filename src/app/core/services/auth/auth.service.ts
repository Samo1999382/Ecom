import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../../../../node_modules/jwt-decode/build/cjs/index.d';
import { Auth } from '../../../shared/interface/auth';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { baseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);
  userId!: any;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    if(isPlatformBrowser(platformId))
    {
      if(localStorage.getItem('userToken') !== null) {
        this.decodeUserData();
      }
    }
  }

  register(data: Auth): Observable<any> {
    return this.http.post(`${baseURL.BaseURL}/auth/signup`, data)
  }

  login(data: Auth): Observable<any> {
    return this.http.post(`${baseURL.BaseURL}/auth/signin`, data)
  }

  decodeUserData() {
    const token = localStorage.getItem('userToken')||'';
    const decoded = jwtDecode(token);
    this.userId = decoded
    this.userToken.next(decoded);
    this.userId = this.userId.id
    return null;
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userToken.next(null);
    this.router.navigate(['/login']);
  }
}
