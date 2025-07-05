import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  showError: boolean = false;
  private sub = new Subscription();

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.sub.add(
      this.errorService.error$.subscribe((msg) => {
        this.errorMessage = msg;
        this.showError = !!msg;

        if (msg) {
          timer(3500).subscribe(() => {
            this.showError = false;
            this.errorService.clearError();
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
