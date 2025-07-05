import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-header',
  standalone: true,
  imports: [
    CommonModule, FormsModule],
  templateUrl: './step-header.component.html',
  styleUrls: ['./step-header.component.scss']
})
export class StepHeaderComponent {


    @Input() stepHeads: any[] = [];
    @Input() currentStep: number = 0;
    @Input() stepsdone: number[] = [];

    @Output() stepChange = new EventEmitter<number>();

    onStepClick(index: number): void {
      console.log("Steps in header ------->", this.stepsdone);
      if (this.stepsdone.includes(Number(index))) {
          this.stepChange.emit(index);
        }
    }
}
