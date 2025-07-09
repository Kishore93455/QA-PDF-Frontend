// whatsapp-preview.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

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


export interface WhatsappMessage {
  templateType?: string;
  headerFormat?: 'TEXT' | 'MEDIA';
  mediaType?: 'IMAGE' | 'VIDEO' | 'PDF';
  mediaUrl?: string;
  headerContent?: string;
  bodyContent?: string;
  footerContent?: string;
  buttons?: Button[];
  carouselItems?: CarouselItem[];
}

@Component({
  selector: 'app-whatsapp-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './whatsapp-preview.component.html',
  styleUrls: ['./whatsapp-preview.component.scss']
})
export class WhatsappPreviewComponent implements OnChanges {

  @Input() message!: WhatsappMessage;
  safePdfUrl: SafeResourceUrl | null = null;
  currentSlide = 0;
  isEmpty = true;
  cur_time = this.getIndianTime()
  fileName = 'My-File'
  ltoHead = "Not supported on Desktop devices"
  ltoContent ="LTO messages are not viewable on WhatsApp Web/Desktop, and recipients will see a fallback message"
  type_content = "Coupon code templates are marketing templates that display a single copy code button. When tapped, the code is copied to the customer's clipboard."

  constructor(private sanitizer: DomSanitizer)
  { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.message)
    if (this.message?.mediaType === 'PDF' && this.message?.mediaUrl) {
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.mediaUrl);
    } else {
      this.safePdfUrl = null;
    }

    this.isEmpty = this.isMessageEmpty();
  }

  isMessageEmpty(): boolean {
    if (!this.message) return true;

    const {mediaUrl,headerContent,bodyContent,
      footerContent,buttons,carouselItems} = this.message;

    return !(
      mediaUrl ||
      (headerContent && headerContent.trim()) ||
      (bodyContent && bodyContent.trim()) ||
      (footerContent && footerContent.trim()) ||
      (buttons && buttons.length > 0) ||
      (carouselItems && carouselItems.length > 0)
    );
  }


  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide(): void {
    if (this.message?.carouselItems && this.currentSlide < this.message.carouselItems.length - 1) {
      this.currentSlide++;
    }
  }

  getIndianTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    };

    return new Intl.DateTimeFormat('en-IN', options).format(now);
  }

}
