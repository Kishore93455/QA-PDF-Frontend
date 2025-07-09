import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { languagesData, up_arrow_svg, down_arrow_svg } from './languagesData';
import { WhatsappPreviewComponent } from '../whatsapp-preview/whatsapp-preview.component';

interface Button {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER' | 'COPY_CODE';
  text: string;
  value: string;
}

interface CarouselItem {
  media: {
    url: string;
    type: 'image' | 'video' | 'pdf';
    file?: File;
  };
  buttons?: Button[];
}

interface WhatsappMessage {
  templateType?: 'GENERIC' | 'LIMITED_TIME_OFFER' | 'COUPON_CODE' | 'MEDIA_CARD_CAROUSEL';
  headerFormat?: 'TEXT' | 'MEDIA';
  mediaType?: 'IMAGE' | 'VIDEO' | 'PDF';
  mediaUrl?: string; //change to file and generate url function should be in Common Component
  headerContent?: string;
  bodyContent?: string;
  footerContent?: string;
  buttons?: Button[];
  carouselItems?: CarouselItem[];
}

@Component({
  selector: 'app-template-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    WhatsappPreviewComponent
  ],
  templateUrl: './template-select.component.html',
  styleUrls: ['./template-select.component.scss']
})
export class TemplateSelectComponent implements OnInit {
  templateForm: FormGroup;

  namingError = '';
  categoryError = '';
  typeError = '';
  languageError = '';
  count = 0;
  searchTerm = '';
  languages = languagesData;
  filteredLanguages = [...languagesData];
  selectedLanguage: any = null;

  messageData: WhatsappMessage = {};

  carouselItems: CarouselItem[] = []

  categoryOptions = [
    { label: 'Marketing (send promotions or information about your products services or business)', value: 'MARKETING' },
    { label: 'Utility (send messages about an existing order or account)', value: 'UTILITY' },
    { label: 'Authentication (send codes to verify a transaction or login)', value: 'AUTHENTICATION' }
  ];

  typeOptions = [
    { label: 'Generic', value: 'GENERIC' },
    { label: 'LTO', value: 'LIMITED_TIME_OFFER' },
    { label: 'Coupon Code', value: 'COUPON_CODE' },
    { label: 'MCC', value: 'MEDIA_CARD_CAROUSEL' }
  ];

  downArrow: SafeHtml;
  upArrow: SafeHtml;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.templateForm = this.fb.group({
      templateName: [''],
      templateCategory: [''],
      templateType: [''],
      templateLanguage: ['']
    });

    this.downArrow = this.sanitizer.bypassSecurityTrustHtml(up_arrow_svg);
    this.upArrow = this.sanitizer.bypassSecurityTrustHtml(down_arrow_svg);
  }

  ngOnInit() {
    this.filteredLanguages = [...this.languages];

    const selectedCode = this.templateForm.get('templateLanguage')?.value;
    if (selectedCode) {
      this.selectedLanguage = this.languages.find(lang => lang.submitCode === selectedCode);
    }

    this.templateForm.get('templateName')?.valueChanges.subscribe(value => {
      if (value) {
        this.namingError = '';
        this.count = value.length;
      }
    });

    this.templateForm.get('templateCategory')?.valueChanges.subscribe(() => {
      this.categoryError = '';
    });

    this.templateForm.get('templateType')?.valueChanges.subscribe(() => {
      this.typeError = '';
    });

    this.templateForm.get('templateLanguage')?.valueChanges.subscribe(value => {
      if (value) {
        this.languageError = '';
        this.onLanguageSelect(value);
      }
    });

    this.templateForm.valueChanges.subscribe(() => this.updateMessageData());
  }

  onLanguageSelect(submitCode: string) {
    this.selectedLanguage = this.languages.find(lang => lang.submitCode === submitCode);
    this.updateMessageData();
  }

  onSearchChange(term: string) {
    this.searchTerm = term.toLowerCase();
    this.filteredLanguages = this.languages.filter(lang =>
      lang.countryName.toLowerCase().includes(this.searchTerm) ||
      lang.name.toLowerCase().includes(this.searchTerm)
    );
  }

  onTemplateNameInput(): void {
    const control = this.templateForm.get('templateName');
    if (!control) return;
    let value: string = control.value || '';
    value = value.replace(/ /g, '_');
    control.setValue(value, { emitEvent: false });
    this.count = value.length;
    this.updateMessageData();
  }

  onContinue() {
    const name = this.templateForm.get('templateName')?.value?.trim() || '';
    const category = this.templateForm.get('templateCategory')?.value;
    const type = this.templateForm.get('templateType')?.value;
    const language = this.templateForm.get('templateLanguage')?.value;

    this.namingError = name ? (name.length > 512 ? 'Template name must not exceed 512 characters.' : '') : 'Template Name is Required.';
    this.categoryError = category ? '' : 'Template Category is Required.';
    this.typeError = type ? '' : 'Template Type is Required.';
    this.languageError = language ? '' : 'Template Language is Required.';

    if (!this.namingError && !this.categoryError && !this.typeError && !this.languageError) {
      console.log('Form submitted successfully!', this.templateForm.value);
    }
  }

  mediaUrl: string = '';
  headerContent: string = '';
  headerFormat: 'TEXT' | 'MEDIA' = 'TEXT';
  bodyContent: string = '';
  footerContent: string = '';
  buttons: Button[] = [];
  mediaType: string = '';

  addButton() {
    this.buttons.push({ type: 'QUICK_REPLY', text: '', value: '' });
    this.updateMessageData();
  }

  removeButton(index: number) {
    this.buttons.splice(index, 1);
    this.updateMessageData();
  }

  addCarouselItem() {
    this.carouselItems.push({
      media: { url: '', type: 'image' },
      buttons: []
    });
    this.updateMessageData();
  }

  removeCarouselItem(index: number) {
    this.carouselItems.splice(index, 1);
    this.updateMessageData();
  }

  addCarouselButton(index: number) {
    this.carouselItems[index].buttons = this.carouselItems[index].buttons || [];
    this.carouselItems[index].buttons!.push({ type: 'QUICK_REPLY', text: '', value: '' });
    this.updateMessageData();
  }

  removeCarouselButton(i: number, j: number) {
    this.carouselItems[i].buttons?.splice(j, 1);
    this.updateMessageData();
  }

  handleCarouselFileInput(event: any, index: number) {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileUrl = reader.result as string;
      const fileType = this.getFileType(file);

      this.carouselItems[index].media = {
        url: fileUrl,
        type: fileType,
        file
      };

      this.updateMessageData();
    };
    reader.readAsDataURL(file);
  }

  getFileType(file: File): 'image' | 'video' | 'pdf' {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    throw new Error('Unsupported file type');
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.mediaUrl = URL.createObjectURL(file);
      this.setMediaType(file.name);
      this.updateMessageData();
    }
  }

  handleFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.mediaUrl = URL.createObjectURL(file);
      this.setMediaType(file.name);
      this.updateMessageData();
    }
  }

  setMediaType(fileName: string) {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext) return;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) this.mediaType = 'IMAGE';
    else if (['mp4', 'webm', 'ogg'].includes(ext)) this.mediaType = 'VIDEO';
    else if (ext === 'pdf') this.mediaType = 'PDF';
    else this.mediaType = '';
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  isImage(url: string): boolean {
    return url.startsWith('data:image') || /\.(jpg|jpeg|png|gif)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return url.startsWith('data:video') || /\.(mp4|webm|ogg)$/i.test(url);
  }

  isPdf(url: string): boolean {
    return url.startsWith('data:application/pdf') || /\.pdf$/i.test(url);
  }

  updateMessageData() {
    const hasCarouselItems = this.carouselItems && this.carouselItems.length > 0;
    const selectedType = this.templateForm.get('templateType')?.value;

    if (
      selectedType === 'GENERIC' ||
      selectedType === 'LIMITED_TIME_OFFER' ||
      selectedType === 'COUPON_CODE' ||
      selectedType === 'MEDIA_CARD_CAROUSEL'
    ) {
      this.messageData.templateType = selectedType;
    }

    this.messageData = {
      ...this.messageData,
      headerFormat: this.headerFormat,
      mediaType: this.mediaType as 'IMAGE' | 'VIDEO' | 'PDF',
      mediaUrl: this.mediaUrl,
      headerContent: this.headerContent,
      bodyContent: this.bodyContent,
      footerContent: this.footerContent,
      buttons: this.buttons,
      carouselItems: hasCarouselItems ? this.carouselItems : undefined
    };
  }
}
