//Subscription Method

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = `http://localhost:3001/api/templates/getList`;

  constructor(private http: HttpClient) { }

  fetchTemplates(payload:any): Observable<any> {

    const params: any = {
      wabaId: payload.wabaId,
      accessToken: payload.accessToken,
      limit: payload.limit,
      pageType: payload.pageType,
      fields : []
    };

  if (payload.cursor) {
    params.cursor = payload.cursor;
  }

  return this.http.get(this.apiUrl, {params});

  }

}


