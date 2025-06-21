import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { BranchesService } from '../../../services/branch-service/branches.service';
import { CreateBranchDialogComponent } from '../components/dialogs/create-branch-dialog/create-branch-dialog.component';
import { ConfirmDialogComponent } from '../components/dialogs/create-branch-dialog/confirm-dialog/confirm-dialog.component';
import { IdService } from '../../../services/idNumbers-service/id.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-branches',
  imports: [CommonModule,FormsModule,FilterPipe ],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
  branches: any[] = [];
  isLoading: boolean = true;
  facilityId: string | null = null;
  searchQuery: string = '';
  constructor(private branchesService: BranchesService,
     private router: Router,
     private activatedRoute : ActivatedRoute,
     private idService : IdService,
     private dialog: MatDialog) {}

   ngOnInit(): void {
    this.facilityId = this.activatedRoute.snapshot.paramMap.get('facilityId');
    this.idService.setFacilityId(this.facilityId);
    this.getBranches();
  }
  // Method to get branches from the service
  getBranches(): void {
    this.branchesService.getAllBranches(this.facilityId).subscribe({
      next: (res) => {
        this.branches = res;
        console.log(this.branches);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching facilities:', err);
        this.branches = [];
        this.isLoading = false;
      }
    });
  }
  

  // Method to edit a branch
  editBranch(branch: any, branchId : string , event:Event): void {

}
  manageBranch(branchId: string): void {
    this.router.navigate([`/Admin/home/${branchId}/tables`]); 
  }
  deleteBranch(branchId: string, event: Event){
   event.preventDefault();  
 
     // Open the confirmation dialog
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       data: { message: 'Are you sure ? all tables and items under this branch will be delete' },
     });
 
     dialogRef.afterClosed().subscribe((result) => {
       if (result) {
         // If user confirms, sign out
         this.branchesService.deleteBranch( branchId).subscribe({
          next: (response) => {
            if (response.success) {
              this.getBranches();
            } else {
              alert(response.message);
            }
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
          }
         });
       }
     });
   }
    addBranch(){
      const dialogRef = this.dialog.open(CreateBranchDialogComponent, {
      width: '400px', 
      data: { message: 'Create a new facility' } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBranches();
      }
    });
  }
  createMenu(branchId : string){
   this.router.navigate([`Admin/home/${branchId}/createMenu`]);
  }
  uploadMenu(branchId : string){
    this.router.navigate([`Home/${branchId}/uploadMenu`]);
  }
viewMenu(branchId: string) {
  const url = this.router.serializeUrl(
    this.router.createUrlTree([`/Home/${branchId}/viewMenu`])
  );
  window.open(url, '_blank');
}
  viewBranchIssues(branchId : string){
    this.router.navigate([`Admin/home/${branchId}/viewIssues`]);
  }
  togglePDFMenu(branchId: string) {
    this.branchesService.changeMenuState(branchId).subscribe(
      (response) => {
        console.log('Menu state updated:', response);
      },
      (error) => {
        console.error('Error updating menu state:', error.error.message);
      }
    );
  }
printQRCode(branch: any): void {
  const qrImage = new Image();
  qrImage.src = `${branch.qrCodeUrl}`;

  qrImage.onload = () => {
    const printWindow = window.open('', '_blank', 'width=1200,height=1200');
    if (!printWindow) return;

    const logoUrl = 'assets/logo.png';
    const htmlContent = `
      <html>
        <head>
          <title>Print QR</title>
          <style>
            body { text-align: center; font-family: Arial; margin: 0; padding: 40px; }
            img.qr { width: 400px; height: 400px; margin-bottom: 20px; }
            img.logo { max-width: 100px; margin-bottom: 20px; }
            h2 { color: #333; margin-bottom: 30px; }
          </style>
        </head>
        <body>
  
          <img src="${qrImage.src}" class="qr" alt="QR Code" />
          <script>
            window.onload = function () {
              window.print();
              setTimeout(() => window.close(), 1000);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };
}


}
