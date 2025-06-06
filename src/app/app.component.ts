import { Component, HostListener } from '@angular/core';
import { ErrorService } from './services/error.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ErrorComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  errorMsg = '';

  constructor(private errorService: ErrorService) {

    this.errorService.error$.subscribe(msg => {
      this.errorMsg = msg;
      if (msg) {
        setTimeout(() => {
          this.errorMsg = '';
          this.errorService.clearError();
        }, 2500);
      }
    });
  }


  @HostListener('document:keydown.enter')
  handleEnterKey() {
    if (this.errorMsg) {
      this.errorMsg = '';
      this.errorService.clearError();
    }
  }

  @HostListener('document:click')
  handleLeftClick() {
    if (this.errorMsg) {
      this.errorMsg = '';
      this.errorService.clearError();
    }
  }
}

