import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';  // To manage state reactively

@Injectable({
  providedIn: 'root',  // This makes the service available throughout the app
})
export class SharedDataService {
 
  private selectedLanguageSubject = new BehaviorSubject<string>('en');  
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();

 
  constructor() {}

  // Method to set the selected language
  setSelectedLanguage(language: string) {
    this.selectedLanguageSubject.next(language); 
  }
  getSelectedLanguage(): string {
    return this.selectedLanguageSubject.value;
  }


 
 
}
