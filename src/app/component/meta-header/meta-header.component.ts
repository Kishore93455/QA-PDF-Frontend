import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meta-header',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './meta-header.component.html',
  styleUrl: './meta-header.component.scss'
})
export class MetaHeaderComponent {

  options = ['None', 'Text', 'Media'];
  selectedOption: string = "None";
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onCheckboxSelect(option: string) {
    this.selectedOption = option;
    this.dropdownOpen = false;
  }

  isChecked(option: string): boolean {
    return this.selectedOption === option;
  }

}



// <svg width="68" height="52" viewBox="0 0 68 52" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M1.5 38.5L18.6967 21.3033C21.6256 18.3744 26.3744 18.3744 29.3033 21.3033L46.5 38.5M41.5 33.5L46.1967 28.8033C49.1256 25.8744 53.8744 25.8744 56.8033 28.8033L66.5 38.5M6.5 51H61.5C64.2614 51 66.5 48.7614 66.5 46V6C66.5 3.23858 64.2614 1 61.5 1H6.5C3.73858 1 1.5 3.23858 1.5 6V46C1.5 48.7614 3.73858 51 6.5 51ZM41.5 13.5H41.525V13.525H41.5V13.5ZM42.75 13.5C42.75 14.1904 42.1904 14.75 41.5 14.75C40.8096 14.75 40.25 14.1904 40.25 13.5C40.25 12.8096 40.8096 12.25 41.5 12.25C42.1904 12.25 42.75 12.8096 42.75 13.5Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>
