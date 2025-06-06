import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-not',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goHome() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}