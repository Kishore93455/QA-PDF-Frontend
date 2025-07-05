import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';
import { GoogleAuthComponent } from '../google-auth/google-auth.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,  
     GoogleAuthComponent, NgxSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
    private spinner: NgxSpinnerService,
    private matdialog : MatDialog,
  ) {}

  goToForgetPassword() {
  const dialogRef = this.matdialog.open(ForgetPasswordComponent, {
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dialog result:', result); 
    }
  });
}


  login(): void {
    if (!this.email || !this.password) {
      this.errorService.setError('Please enter both email and password');
      return;
    }

    this.isLoading = true;
    this.spinner.show()



      this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.spinner.hide(); 
        this.router.navigate(['/qa']) },
      error: (error) => {
        this.isLoading = false;
        this.spinner.hide(); 
        this.errorService.setError(error.error?.message || 'Login failed');
      }
    });
  }

  

}
