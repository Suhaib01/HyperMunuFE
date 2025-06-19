import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  private baseUrl = environment.API_URL; 
  constructor(private http: HttpClient) {}
  
  getAllFacilities(): Observable<any> {

     const token = localStorage.getItem('token');
     const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
  });  

    return this.http.get<any>(`${this.baseUrl}/Facility/getAll`, {
    headers: headers,
    withCredentials: false 
  });
  }

  deleteFacility(facilityId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/facility/${facilityId}/delete`);
  }
  createFacility(facility : any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/facility/create`,facility);
  }
  update(facilityId: string,facility : any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/facility/${facilityId}/update`,facility);
  }
}
