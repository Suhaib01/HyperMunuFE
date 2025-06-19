import { Component, OnInit, Inject, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { FilesService } from '../../../../../services/file-service/files.service';


@Component({
  selector: 'view-menu',  
  templateUrl: './view-menu.component.html',  
  styleUrls: ['./view-menu.component.scss'], 
  imports: [CommonModule], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class ViewMenuComponent implements OnInit {
  isFileLoaded: boolean = false;
  isFileProcessing: boolean = false;
  progress: number = 0;
  fileUrl: SafeUrl | null = null;
  isMobile: boolean = false;
  isPdfSupported: boolean = true;
  tableId: string | null = null;
  fullPath: string | null = null;
  selectedLanguage : string = '';
  branchId : string | null = null;
  filePath: SafeResourceUrl | null = null;
  isFromAdmin : boolean = false;

  
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fileService: FilesService,
   private activetedRoute: ActivatedRoute,
  ) {
    this.branchId = this.activetedRoute.snapshot.paramMap.get('branchId');

    
  }

  ngOnInit(): void {
    this.tableId = this.activetedRoute.snapshot.paramMap.get('tableId');
    console.log(this.tableId);
    if(this.tableId !== null) {
      this.isFromAdmin =false;
    }else(this.isFromAdmin = true);
    if (isPlatformBrowser(this.platformId)) {
      this.detectDevice();
      this.fetchFile();
      window.addEventListener('resize', () => this.detectDevice());
    }
  }

  detectDevice(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  fetchFile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isFileProcessing = true;
      
      let interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10; 
        } else {
          clearInterval(interval);
          this.isFileLoaded = true;
          this.isFileProcessing = false;
        }
      }, 100); 
  
      this.fileService.getFile(this.branchId).subscribe(blob => {
        const file = new Blob([blob], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        
        console.log('Generated File URL:', fileURL);  // Debugging step
        
        this.filePath = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        this.fullPath = fileURL; // Allow download link to work
      }, error => {
        console.error('File retrieval error:', error);
      });
    }
  }
  
  checkPdfSupport(): void {
    const objectElement = document.createElement('object');
    objectElement.type = 'application/pdf';
    this.isPdfSupported = !!objectElement;
  }

  onPdfError(): void {
    this.isPdfSupported = false;
  }
}
