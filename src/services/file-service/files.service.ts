import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private baseUrl = environment.API_URL; 
  constructor(private http: HttpClient) {}
  
  uploadFile(branchId: string | null, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('branchId', branchId!); 
  
    return this.http.post<any>(`${this.baseUrl}/Pdf/${branchId}/upload`, formData);
  }
  getFile(branchId: string | null): Observable<Blob> {
    return this.http.get<Blob>(`${this.baseUrl}/Pdf/${branchId}/get`, {
      responseType: 'blob' as 'json', // Ensure TypeScript understands the response
    });
  }
  
  
  

}
