import { Component, HostListener } from '@angular/core';
import { ErrorService } from './services/error.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ErrorComponent } from './components/commom-components/error/error.component';
import { FbAuthComponent } from './components/auth/fb-auth/fb-auth.component';
import { LoaderComponent } from './components/commom-components/Loader/loader.component';
import { HeaderComponent } from './components/commom-components/header/header.component';
import { PagenationComponent } from './components/meta-templates/pagenation/pagenation.component';
import { MetaTemplateComponent } from './components/meta-templates/meta-template/meta-template.component';
import { UiPracticeComponent } from './component/ui-practice/ui-practice.component';
import { TemplateSelectComponent } from './component/template-select/template-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [CommonModule, TemplateSelectComponent],
  // imports: [CommonModule, UiPracticeComponent],
  // imports: [CommonModule, MetaTemplateComponent, LoaderComponent],
  imports: [CommonModule, RouterOutlet, ErrorComponent,
    HeaderComponent, FbAuthComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent { }

