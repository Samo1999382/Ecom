import { AuthService } from './../../../core/services/auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(60), Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{8,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword)

  errorMessage: string = '';
  isLoading:boolean = false;

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { notSame: true }
  }

  constructor(private authService:AuthService, private router:Router) {}

  submitForm() {
    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next:(res) => {
        this.isLoading = false;
        if(res.message == 'success') {
          this.router.navigate(['/login']);
        }
      },
      error:(err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    })
  }
}
