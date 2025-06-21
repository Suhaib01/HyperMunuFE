import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private authUrl = environment.API_URL;

  constructor(private http: HttpClient) { }


register(data: FormData): Observable<any> {
  return this.http.post(`${this.authUrl}/auth/register`, data);
}

login(data: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(`${this.authUrl}/auth/login`, data, { headers });
}

getUser(): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found');
    return throwError(() => new Error('No token found'));
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(`${this.authUrl}/auth/getUser`, {
    headers: headers,
    withCredentials: false // usually false for JWT; set true only if you use cookies
  });
}


}
