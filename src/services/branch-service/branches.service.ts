import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BranchesService {

 private baseUrl = environment.API_URL; 

   constructor(private http: HttpClient) {}

   getAllBranches(facilityId : string | null): Observable<any> {
    return this.http.get<any>(this.baseUrl+`/Branch/${facilityId}/getAll`);
  }

  // Delete a branch by its ID
  deleteBranch(branchId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Branch/${branchId}/delete`);
  }
  createBranch(branchId: string |null , branch : any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Branch/${branchId}/create`,branch);
  }
  update(branchId: string , facilityId: string , branch : any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/branch/${facilityId}/update/${branchId}`,branch);
  }
  getMenuState(entityId: string | null): Observable<boolean> {
    const url = `${this.baseUrl}/branch/${entityId}/menuType`;
    return this.http.get<boolean>(url); 
  }
  changeMenuState(branchId : string | null): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/branch/${branchId}/changeMenuState`,{});
  }
  getAll() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/branch/getAllBranches`,{});
  }
  setIssue(branchId: string | null, issue: string | null, file: File | null): Observable<any> {
    const formData = new FormData();
    
    if (issue && issue.trim()) {
      formData.append('issue', issue);
    }
  
    if (file) {
      formData.append('file', file);
    }
    
    // Ensure that we send either issue or file in the form data
    if (formData.has('issue') || formData.has('file')) {
      return this.http.post(`${this.baseUrl}/branch/${branchId}/setIssue`, formData);
    } else {
      console.error('No issue or file to submit');
      return new Observable();
    }
  }
  getIssues(branchId: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/branch/${branchId}/getAllIssues`,{});
  }
  deleteIssue(issueId: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/branch/${issueId}/deleteIssue`);
  }
}
