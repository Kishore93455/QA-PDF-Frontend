import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';
import { googleEnvironment } from '../../../../environments/environment'

declare const google: any;

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.css'
})
export class GoogleAuthComponent {

    isLoading: boolean = false;
    token: string = '';

    constructor(
      private authService: AuthService,
      private router: Router,
      private errorService: ErrorService
    ) {}

    handleCredentialResponse(response: any): void {
      this.token = response.credential;
      this.googleAuth();
      // this.requestGmailAccess();
    }


    // requestGmailAccess(): void {
    //   const tokenClient = google.accounts.oauth2.initTokenClient({
    //     client_id: googleEnvironment.googleClientId,
    //     scope: mailApi.apiUrl,
    //     callback: (tokenResponse: any) => {
    //       if (tokenResponse && tokenResponse.access_token) {
    //         this.accessToken = tokenResponse.access_token;
    //         this.googleAuth();
    //       } else {
    //         this.errorService.setError('Failed to get Gmail access token');
    //         this.isLoading = false;
    //       }
    //     }
    //   });
    //   tokenClient.requestAccessToken();
    // }

    promptGoogleLogin(): void {
      this.isLoading = true
      google.accounts.id.initialize({
        client_id: googleEnvironment.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
        itp_support: true
      });

      google.accounts.id.renderButton(
      document.getElementById("google-button"),
         {
          theme: 'filled_blue',
          size: 'medium',
          width: 340,
          text: 'signin_with',
          shape: 'circle',
          type: 'standard',
          logo_alignment: 'center'
        });
    }

    googleAuth(): void {
    if (!this.token) {
      this.errorService.setError('No Google token was provided');
      return;
    }

    this.isLoading = true;

    this.authService.googleLogin(this.token).subscribe({
      next: () => this.router.navigate(['/qa']),
      error: (error) => {
        this.errorService.setError(error.error?.message || 'Google login failed');
        this.isLoading = false;
      }
    });
  }

}
