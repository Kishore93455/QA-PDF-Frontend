import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container" *ngIf="errorMessage">
      <div class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
  @Input() showError: boolean = false;  
}