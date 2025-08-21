import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { ApiStatusCode } from '../../core/models/api-response.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  const payload = this.loginForm.value;

  this.auth.login(payload).subscribe({
    next: (response) => {
      if (response.statusCode === ApiStatusCode.OK && response.data?.accessToken) {
        // Token is automatically saved by the AuthService
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = response.errorMessage || 'Login failed';
      }
    },
    error: (err) => {
      console.error('Login error', err);
      this.errorMessage = err?.error?.errorMessage || 'Login failed';
      this.loading = false;
    },
    complete: () => {
      this.loading = false;
    }
  });
}
}
