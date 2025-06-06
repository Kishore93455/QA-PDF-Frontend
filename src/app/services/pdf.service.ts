import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface PdfUploadResponse {
  message: string;
  pdf: {
    id: string;
    title: string;
    originalName: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = `${environment.apiUrl}/pdf`;

  constructor(private http: HttpClient) { }

  uploadPdf(file: File): Observable<PdfUploadResponse> {
    const formData = new FormData();
    formData.append('pdf', file);
    
    return this.http.post<PdfUploadResponse>(`${this.apiUrl}/upload`, formData);
  }
  
  getUserPdfs(): Observable<PdfUploadResponse[]> {
    return this.http.get<PdfUploadResponse[]>(`${this.apiUrl}/user`);
  }

  deletePdf(pdfId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${pdfId}`);
  }

  viewPdf(pdfId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pdfId}`, { responseType: 'blob' });
  }

  createpdf(pdfTemplate: File, data: string): Observable<Blob> {
    const formData = new FormData();
    formData.append('pdf', pdfTemplate);
    formData.append('data', data);

    return this.http.post(`${environment.apiUrl}/create_pdf/generate-pdf`, formData, {
      responseType: 'blob'
    });
  }

  uploadpdf(contentpdf: File, templatepdf: File): Observable<any> {
    const formData = new FormData();
    formData.append('contentPdf', contentpdf);
    if (templatepdf.size > 0) {
      formData.append('templatePdf', templatepdf);
    }

    return this.http.post(`${environment.apiUrl}/edit_pdf/upload`, formData);
  }

  downloadpdf(sections: string): Observable<Blob> {
    return this.http.post(`${environment.apiUrl}/edit_pdf/download`, JSON.parse(sections), {
      responseType: 'blob'
    });
  }

}
