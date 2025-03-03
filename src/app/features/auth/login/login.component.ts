import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

  // providers: [AuthService],
  // imports: [],
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })

    errorMessage: string = '';
    isLoading:boolean = false;

    constructor(private authService:AuthService, private router:Router) {}

    submitForm() {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next:(res) => {
          this.isLoading = false;
          if(res.message == 'success') {
            localStorage.setItem('userToken', res.token);
            this.authService.userToken.next(res.token);
            this.router.navigate(['/home']);
          }
        },
        error:(err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
        }
      })
    }
}
