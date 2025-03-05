import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  errorMsg: any;
  scucessMsg: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });

  loginUser(): void {
    if (this.loginForm.valid) {
      this.userService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.msg === 'done') {
            this.errorMsg = null;
            this.scucessMsg = true;
            localStorage.setItem('Token', res.token);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.msg;
        },
      });
    } else {
      this.loginForm.markAsTouched();
    }
  }
}
