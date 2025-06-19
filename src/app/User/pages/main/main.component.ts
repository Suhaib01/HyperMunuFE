import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageDialogComponent } from '../../components/dialogs/language-dialog/language-dialog.component';
import { IdService } from '../../../../services/idNumbers-service/id.service';
import { BranchesService } from '../../../../services/branch-service/branches.service';
import { SharedDataService } from '../../../../services/shared-data/shared-data.service';



@Component({
  selector: 'app-main',
  standalone: true, 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [FormsModule,CommonModule,LanguageDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MainComponent   {
  @ViewChild(LanguageDialogComponent) languageDialog!: LanguageDialogComponent;
  isLanguageSelectionVisible: boolean = false;
  selectedLanguage: string = 'en';
  tableId :string| null = null;
  branchId: string | null = null;
  isPdfMenu: boolean = false;
constructor(private Router : Router ,
  private activatedRoute: ActivatedRoute,
  private sharedService: SharedDataService,
  private idService : IdService,
  private branchesService: BranchesService,
){
 
  this.tableId = this.activatedRoute.snapshot.paramMap.get('tableId');
  this.idService.setTableId( this.tableId) 

  this.branchId = this.activatedRoute.snapshot.paramMap.get('branchId');
  this.idService.setBranchId(this.branchId);

  this.sharedService.selectedLanguage$.subscribe((language) => {
    this.selectedLanguage = language;
  });
}
onLogin(){
  this.Router.navigate([`${this.branchId}/${this.tableId}/login`]);
}
openLanguageDialog() {
  this.languageDialog.openDialog();
}

  closeLanguageSelection(): void {

    this.isLanguageSelectionVisible = false;
  }

  confirmLanguageSelection(): void {

    this.isLanguageSelectionVisible = false;
    // Additional logic to save the language preference, e.g., in localStorage
  
  }

  viewMenu() {
    this.branchesService.getMenuState(this.branchId).subscribe({
      next: (data: any) => {
        this.isPdfMenu = data.data.isMenuPdf;
        if (this.isPdfMenu) {
          this.Router.navigate([`${this.branchId}/${this.tableId}/viewMenu`]);
        } else {
          this.Router.navigate([`${this.branchId}/${this.tableId}/viewCategories/${this.tableId}`]);
        }
      },
      error: (err) => {
        console.error("Error fetching menu state:", err);
      }
    });
  }
  



  
  
  

}
