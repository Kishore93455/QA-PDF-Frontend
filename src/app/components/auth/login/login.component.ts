import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {}
  
  login(): void {
    if (!this.email || !this.password) {
      this.errorService.setError('Please enter both email and password');
      return;
    }
    
    this.isLoading = true;
    
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/qa']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorService.setError(error.error?.message || 'Login failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
