import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService
  ) {}
  
  register(): void {
    if (!this.name || !this.email || !this.password) {
      this.errorService.setError('Please fill in all fields');
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.errorService.setError('Passwords do not match');
      return;
    }
    
    this.isLoading = true;
    
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/qa']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorService.setError(error.error?.message || 'Registration failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
