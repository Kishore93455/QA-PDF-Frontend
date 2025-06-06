import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { ErrorService } from '../../services/error.service';

interface Section {
  heading: string;
  content: string;
}

@Component({
  selector: 'app-edit-pdf', 
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-pdf.component.html',
  styleUrl: './edit-pdf.component.scss'
})
export class EditPdfComponent {
  contentPdf: File | null = null;
  templatePdf: File | null = null;
  sections: Section[] = [];
  isLoading: boolean = false;

  constructor(
    private pdfService: PdfService,
    private errorService: ErrorService
  ) { }

  onContentPdfSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.contentPdf = file;
    } else {
      this.errorService.setError('Please select a valid PDF file');
      event.target.value = '';
      this.contentPdf = null;
    }
  }

  onTemplatePdfSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.templatePdf = file;
    } else if (file) {
      this.errorService.setError('Please select a valid PDF file');
      event.target.value = '';
      this.templatePdf = null;
    }
  }

  uploadPdfs(): void {
    if (!this.contentPdf) {
      this.errorService.setError('Please select a content PDF file');
      return;
    }

    this.isLoading = true;
    this.pdfService.uploadpdf(this.contentPdf, this.templatePdf || new File([], 'empty'))
      .subscribe({
        next: (response: any) => {
          this.sections = response.sections || [];
          if (this.sections.length === 0) {
            this.errorService.setError('No sections found in the PDF');
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error uploading PDFs:', error);
          this.errorService.setError('Error uploading PDFs: ' + (error.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
  }

  saveAndDownload(): void {
    if (this.sections.length === 0) {
      this.errorService.setError('No sections to save');
      return;
    }

    this.isLoading = true;
    const sectionsJson = JSON.stringify({ sections: this.sections });
    
    this.pdfService.downloadpdf(sectionsJson)
      .subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';   
          link.click();
          URL.revokeObjectURL(url);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error downloading PDF:', error);
          this.errorService.setError('Error downloading PDF: ' + (error.error?.message || 'Unknown error'));
          this.isLoading = false;
        }
      });
  }

  resetEditor(): void {
    this.sections = [];
    this.contentPdf = null;
    this.templatePdf = null;
  }
}
