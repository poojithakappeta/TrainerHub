import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUp: FormGroup;
  errorMessage: string = '';
  pass: boolean = true;

  isOtpSent = false;
  isOtpVerified = false;
  verificationData: any = {};

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }
  user: User;
  ngOnInit(): void {
    this.signUp = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      // otp: [, [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      userRole: ['', [Validators.required]]

    });
  }
  onSignup() {
    if (this.signUp.valid) {
      this.user = this.signUp.value;

      if (this.signUp.value.password != this.signUp.value.confirmPassword) {
        this.pass = false;
        this.errorMessage = "Password and confirm password do not match";
        return;

      }
      // this.authService.addUser(this.user).subscribe((data) => {
      //   this.route.navigate(['/login']);
      // })

      this.authService.addUser(this.user).subscribe({
        next: (data) => {
          this.route.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = error.error || 'An unexpected error occurred';
        }
      });

    }

  }
  get f() {
    return this.signUp.controls;
  }


  sendOtp() {
    this.authService.sendOtp(this.signUp.value.email).subscribe(
      (data) => {
        console.log(data);
        this.verificationData = data;
        this.isOtpSent = true;
        console.log(this.isOtpVerified);
        alert('OTP sent to your email');
      },
      (error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP as Email already registered');
      });

  }
  verifyOtp() {
    console.log(this.signUp.value.otp);

    if (this.verificationData.otp == this.signUp.value.otp) {
      this.isOtpVerified = true;
      alert('OTP verified');
    } else {
      alert('Invalid OTP');
    }
  }


}
