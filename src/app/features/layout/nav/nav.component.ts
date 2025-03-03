import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  isLogin: boolean = false;

  constructor(public _AuthService: AuthService) { }

  ngOnInit(): void {
    this._AuthService?.userToken.subscribe({
      next: (res) => {
        if (res) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      }
    })
  }
}
