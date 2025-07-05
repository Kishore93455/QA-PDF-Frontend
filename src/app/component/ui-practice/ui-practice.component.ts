import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TemplateSelectComponent } from '../template-select/template-select.component';

@Component({
  selector: 'app-ui-practice',
  standalone: true,
  imports: [MatIconModule, TemplateSelectComponent],
  templateUrl: './ui-practice.component.html',
  styleUrl: './ui-practice.component.scss'
})
export class UiPracticeComponent {

}
