import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagenation',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './pagenation.component.html',
  styleUrl: './pagenation.component.scss'
})
export class PagenationComponent {

      currentLimit: number = 5;

      @Input() pageType: string = "";
      @Input() loadingButton: string = "";
      @Output() limit = new EventEmitter<number>();
      @Output() btnName = new EventEmitter<string>();

      get disableFirst(): boolean {
        return this.pageType === 'FIRST';
      }

      get disablePrev(): boolean {
        return this.pageType === 'FIRST';
      }

      get disableNext(): boolean {
        return this.pageType === 'LAST';
      }

      get disableLast(): boolean {
        return this.pageType === 'LAST';
      }

      goToPreviousPage () {
        this.btnName.emit("PREVIOUS")
      }

      goToNextPage() {
        this.btnName.emit("NEXT")
      }

      goToFirst() {
        this.btnName.emit("FIRST")
      }

      goToLast() {
        this.btnName.emit("LAST")
      }

      onLimitChange(limit: number) {
        this.limit.emit(limit);
      }
}
