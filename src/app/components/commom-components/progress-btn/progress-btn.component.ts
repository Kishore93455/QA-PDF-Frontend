import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-progress-btn',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './progress-btn.component.html',
  styleUrls: ['./progress-btn.component.scss']
})
export class ProgressBtnComponent implements OnChanges {

  constructor(private loaderService: LoaderService) {}

  @Input() form?: FormGroup;
  @Input() isLastStep: boolean = false;
  @Input() currentStep: number = 0;
  @Input() totalSteps: number = 0;

  @Output() stepChange = new EventEmitter<void>();
  @Output() stepsdone = new EventEmitter<number[]>();

  isProcessing: boolean = false;
  btnText: string = 'Continue';
  stepsDone: number[] =[];

  ngOnChanges(changes: SimpleChanges): void {
    this.isLastStep = this.currentStep === this.totalSteps - 1;
    this.btnText = this.isLastStep ? 'Finish' : 'Continue';
  }

  async handleClick(): Promise<void> {

    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    await new Promise(resolve => setTimeout(resolve, 1000));

    this.isProcessing = false;

    if (!this.stepsDone.includes(this.currentStep)) {
      this.stepsDone.push(this.currentStep);
    }

    const nextStep = this.currentStep + 1;
    if (nextStep < this.totalSteps && !this.stepsDone.includes(nextStep)) {
      this.stepsDone.push(nextStep);
    }

    const uniqueSteps = Array.from(new Set(this.stepsDone)).sort((a, b) => a - b);
    this.stepsdone.emit(uniqueSteps);

    console.log("Steps ------->", this.stepsDone)

    this.stepChange.emit();
  }
}
