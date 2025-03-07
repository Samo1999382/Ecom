import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {
  cartId!: string;

  constructor(private cart: CartService) {
    this.cartId = this.cart.cartId
  }

  checkOutForm:FormGroup = new FormGroup({
    details: new FormControl(null),
    city: new FormControl(null),
    phone: new FormControl(null)
  })

  submitForm(){
    this.cart.checkOut(this.cartId, this.checkOutForm.value).subscribe({
      next: res => {
        window.location.href=res.session.url
      }
    })
  }
}
