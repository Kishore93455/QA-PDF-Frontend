import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-create-pdf',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-pdf.component.html',
  styleUrl: './create-pdf.component.css'
})
export class CreatePdfComponent implements OnInit {
  selectedFile: File | null = null;
  markdownText: string = '';
  pdfList: any[] = [];
  isLoading: boolean = false;
  fileName: string = '';
  c_text: string = '';
  ispdflist: boolean = false;

  constructor(private pdfService: PdfService , private errorService : ErrorService) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.fileName = file.name;
    } else {
      this.errorService.setError('Please select a valid PDF file');
      event.target.value = ''; 
      this.fileName = '';
    }
  }

  generatePdf() {

    if (!this.selectedFile || (!this.markdownText.trim())) {
      alert('Please select a template PDF and enter text or markdown');
      return;
    }
    this.isLoading = true;

    if (this.markdownText.trim() === '') {
      this.errorService.setError('Please enter text or markdown');
      return;
    }

    const content = this.markdownText;
    this.pdfService.createpdf(this.selectedFile, content).subscribe({
      next: (response) => {
        alert('PDF generated successfully');
        this.pdfList.unshift({
          name: this.fileName,
          originalName: this.fileName,
          id: Date.now(),
          content: response 
        });
        this.ispdflist = true;
        this.markdownText = '';
        this.selectedFile = null;
        this.fileName = '';
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (error) => {
        console.error('Error generating PDF:', error);
        this.errorService.setError('Error generating PDF: ' + (error.error?.message || 'Unknown error'));
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  view() {
    if (this.pdfList.length === 0) {
      alert('No PDFs to view');
      return;
    }
    this.isLoading = true;
    const latestPdf = this.pdfList[0];
    const blob = new Blob([latestPdf.content], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    this.isLoading = false;
  }

}
