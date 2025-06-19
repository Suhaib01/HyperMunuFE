import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SharedDataService } from '../../../../../services/shared-data/shared-data.service';





@Component({
  selector: 'app-language-dialog',
  imports: [CommonModule],
  templateUrl: './language-dialog.component.html',
  styleUrl: './language-dialog.component.scss'
})
export class LanguageDialogComponent {

  isDialogOpen: boolean = false;

  constructor(private sharedService: SharedDataService) {}

  
  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }


  selectLanguage(language: string) {
    this.sharedService.setSelectedLanguage(language);  // Update the shared language
    this.closeDialog();  // Close the dialog after selection
  }
}
