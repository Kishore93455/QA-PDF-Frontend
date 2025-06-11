import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { QaService } from '../../services/qa.service';
import { RouterModule } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.css'
})
export class QaComponent implements OnInit {

  pdfshow : boolean = false;
  viewbtn : boolean = false;
  but : boolean = true;
  tit : string = '';
  msg: string = '';
  showUploadContainer: boolean = true;
  showPdfList: boolean = false;
  showQaSection: boolean = false;
  selectedFile: File | null = null;
  uploadedPdfId: string | null = null;
  question: string = '';
  answer: string = '';
  isUploading: boolean = false;
  isProcessing: boolean = false;
  pdfList: any[] = []; 
  
  constructor(
    private pdfService: PdfService,
    private qaService: QaService,
    private errorService: ErrorService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
  } 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  questionai(): void {
    if (this.question.trim() === '') { 
      this.errorService.setError('Please enter a question');
      return;
    }
    this.router.navigate(['/chat'], { queryParams: { question: this.question } });
  }

  viewpdf(pdfId?: string): void {
    
    if (pdfId) {
      this.pdfshow = true;
      this.pdfService.viewPdf(pdfId).subscribe({
        next: (response) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        },
        error: (error) => {
          console.error('PDF view error:', error);
          this.errorService.setError('Failed to view PDF. Please try again.');
          this.pdfshow = false; 
        }
      });
    } else {
      this.pdfshow = false;
    }
  }

  getpdf(): void {
    this.showPdfList = !this.showPdfList;
    this.showUploadContainer = !(this.showPdfList);
    
    if (this.showPdfList) {
      this.isProcessing = true;

      this.pdfService.getUserPdfs().subscribe({
        next: (response) => {
          if (response.length === 0) {
            this.msg = 'No PDFs found. Please upload a PDF.';
          } else {  
            this.pdfList = response;
            this.showQaSection = false;
          }
          this.isProcessing = false; 
        },
        error: (error) => {
          console.error('Error fetching user PDFs:', error);
          if (error.status === 401) {
            this.errorService.setError('Authentication required. Please log in again.');
          } else if (error.status === 404) {
            this.errorService.setError('PDF service endpoint not found. Please check server configuration.');
          } else {
            this.errorService.setError(error.error?.message || 'Failed to fetch user PDFs. Please try again.');
          }
          this.isProcessing = false;
        }
      });
    }
  }
  
  uploadPdf(): void {
    if (!this.selectedFile) {
      this.errorService.setError('Please select a PDF file first');
      return;
    }
    
    this.isUploading = true;
    
    this.pdfService.uploadPdf(this.selectedFile).subscribe({
      next: (response) => {
        this.uploadedPdfId = response.pdf?.id;
        this.tit = response.pdf?.title;
        this.showUploadContainer = false;
        this.showPdfList = false;
        this.showQaSection = true;
        this.isUploading = false;
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('PDF upload error:', error);
        this.errorService.setError(error.error?.message || 'Failed to upload PDF. Please try again.');
        this.isUploading = false;
      }
    });
  }


  askQuestion(): void {
    if (!this.uploadedPdfId) {
      this.errorService.setError('Please upload a PDF first');
      return;
    }
    
    if (!this.question.trim()) {
      this.errorService.setError('Please enter a question');
      return;
    }
    
    this.isProcessing = true;
    
    this.qaService.askQuestion(this.uploadedPdfId, this.question).subscribe({
      next: (response) => {
        this.showQaSection = false;
        this.answer = response.answer;
        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Question processing error:', error);
        this.errorService.setError(error.error?.message || 'Failed to process question. Please try again.');
        this.isProcessing = false;
      }
    });
  }

  selectPdf(pdfId: string, title : string): void {
    this.uploadedPdfId = pdfId;
    this.showPdfList = false;
    this.showUploadContainer = false;
    this.showQaSection = true;
    this.tit = title;
  }

  goBack(): void {
    if (!this.pdfshow) {
    this.answer = '';
    this.isProcessing = false;
    this.isUploading = false;
    this.selectedFile = null;
    this.showUploadContainer = false;
    this.showPdfList = false;
    this.showQaSection = true;}
    else {
    this.question = '';
    this.answer = '';
    this.isProcessing = false;
    this.isUploading = false;
    this.selectedFile = null;
    this.showUploadContainer = true;
    this.showPdfList = false;
    this.showQaSection = false;
    }
  }

  deletePdf(pdfId: string): void {
    this.pdfService.deletePdf(pdfId).subscribe({
      next: () => {
        console.log('PDF deleted successfully');
        this.uploadedPdfId = null;
        this.question = '';
        this.answer = '';
        this.isProcessing = false;
        this.isUploading = false;
        this.selectedFile = null;
        this.showUploadContainer = false;
        this.showPdfList = true;
        this.showQaSection = false;
        this.pdfList = [];
        
        this.pdfService.getUserPdfs().subscribe({
          next: (response) => {
            if (response.length === 0) {
              this.msg = 'No PDFs found. Please upload a PDF.';
              this.showUploadContainer = true;
              this.showPdfList = false;
            } else {
              this.pdfList = response;
            }
          },
          error: (error) => {
            console.error('Error fetching PDFs after deletion:', error);
            this.errorService.setError('Failed to refresh PDF list');
          }
        });
      },
      error: (error) => {
        console.error('Error deleting PDF:', error);
        this.errorService.setError('Failed to delete PDF');
      }
    });
  }
}

