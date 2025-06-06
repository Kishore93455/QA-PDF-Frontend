import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private apiUrl = `${environment.apiUrl}/qa`;

  constructor(private http: HttpClient) { }

  askQuestion(pdfId: string, question: string): Observable<{ answer: string }> {
    return this.http.post<{ answer: string }>(`${this.apiUrl}/ask/${pdfId}`, { question });
  }

}
