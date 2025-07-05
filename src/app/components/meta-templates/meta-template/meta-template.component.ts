import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagenationComponent } from '../pagenation/pagenation.component';
import { TemplateService } from '../../../services/template.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';


interface Template {
  name: string;
  category:string;
  type: string;
  status: string;
  language: string;
}


@Component({
  selector: 'app-meta-template',
  standalone: true,
  imports: [CommonModule, FormsModule, PagenationComponent, MatTableModule, MatIconModule],
  templateUrl: './meta-template.component.html',
  styleUrl: './meta-template.component.scss'
})
export class MetaTemplateComponent implements OnInit, OnDestroy {

  afterCursor?: string;
  beforeCursor?: string;
  totalCount : number = 0;
  limit: number = 5;
  wabaId: string = '1170671974399502';
  accessToken: string = 'EAAO1Oa5hHSIBO2YPteFWzHj2xBSni0ZAIrAqT2bxnTRIhWeytBkiv8SJpPf8DbiZB8Fuu5DyUiiosftQ34qYZB6ZBOwK6K8q5F1icGJQs9dB0vNkmh6LEGxbMTDcrW2oBN1zBYKGRcGQUo1YQ14JksTThKRdt2ZC2dVlPZCkLiFpk5vKtPZAbq0PnZB8vgWb';
  pageType: 'FIRST' | 'PREVIOUS' | 'NEXT' | 'LAST' = 'FIRST';
  cursor?: string;
  columns: string[] = ['Tmplate name', 'Template type', 'Language', 'Status', 'Actions'];
  data: Template[] = [];
  private payload$ = new Subject<any>();
  private apiSub!: Subscription;
  loadingButton: string = '';

  constructor(private service: TemplateService) {}

  ngOnInit(): void {
    this.apiSub = this.payload$
      .pipe(switchMap((payload) => this.service.fetchTemplates(payload)))
      .subscribe({
        next: (res) => this.handleResponse(res),
        error: (err) => console.error('Error:', err)
      });
    this.getTemplateData()
  }

  ngOnDestroy(): void {
    this.apiSub.unsubscribe();
  }

  onLimitChange(limit: number) {
    this.limit = limit;
    this.pageType = "FIRST"
    this.cursor = "";
    this.loadingButton = "FIRST";
    this.getTemplateData();
  }

  onBtnClick(name: string) {
    this.pageType = name as 'FIRST' | 'PREVIOUS' | 'NEXT' | 'LAST' ;
    this.loadingButton = this.pageType;
      if (this.pageType === 'NEXT') {
      this.cursor = this.afterCursor;
      } else if (this.pageType === 'PREVIOUS') {
        this.cursor = this.beforeCursor;
      } else {
        this.cursor = undefined;
      }
      this.getTemplateData();
  }


  getTemplateData() {

    const payload = {
      wabaId: this.wabaId,
      accessToken: this.accessToken,
      limit: this.limit,
      pageType: this.pageType,
      cursor: this.cursor
    };

    this.payload$.next(payload); //triggers and cancels any ongoing call
  }

  handleResponse(res: any) {
    const templates = res?.data?.templates || [];

    this.data = templates.map((t: any): Template => ({
      name: t.name,
      category: t.category,
      type: t.templateType,
      status: t.status,
      language: t.language
    }));

    this.totalCount = res?.data?.totalTemplates || 0;

    const cursors = res?.data?.cursor;
    if (cursors) {
      this.beforeCursor = cursors.before;
      this.afterCursor = cursors.after;
      if (!cursors.previous) this.pageType = "FIRST";
      if (!cursors.next) this.pageType = "LAST";
    }
    this.loadingButton = '';
  }
}
