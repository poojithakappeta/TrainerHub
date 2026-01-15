import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          const role = this.authService.getRole();

          if (role === 'Manager' || role === 'Coordinator') {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/user-dashboard']).then(() => {
              window.location.reload();
            });
          }
        },
        error: (error) => {
          this.errorMessage = "Invalid email or password";
          console.error('Login error:', error);
        }
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}