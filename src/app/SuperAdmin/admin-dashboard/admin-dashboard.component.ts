import { Component } from '@angular/core';
import { FacilitiesService } from '../../../services/facility-service/facilities.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateFacilityDialogComponent } from '../../Admin/components/dialogs/create-facility-dialog/create-facility-dialog.component';
import { CommonModule } from '@angular/common';
import { BranchesService } from '../../../services/branch-service/branches.service';
import { JsonToArrayPipe } from '../json-to-array.pipe';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,JsonToArrayPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  facilities: any[] = [];
  isLoading: boolean = true;
 branches: any[] = [];
 constructor(private facilityService: FacilitiesService, private router : Router,private dialog: MatDialog,private branchesService: BranchesService) {}
ngOnInit(): void {
    this.fetchFacilities();
    
  }

fetchFacilities(): void {
    this.facilityService.getAllClients().subscribe({
      next: (res) => {
        this.facilities = res;
        console.log(res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching facilities:', err);
        this.facilities = [];
        this.isLoading = false;
      }
    });
  }

  editFacility(facility: any,facilityId:string, event: Event): void {
    
  }
  
  
  deleteFacility(facilityId: string, event : Event) : void {
   
 }
        
    addFacility() {
      const dialogRef = this.dialog.open(CreateFacilityDialogComponent, {
        width: '400px',
        data: { message: 'Create a new facility' } 
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) { 
          this.fetchFacilities(); 
          this.facilities.push(result);  
        }
      });
    }
    
  manageFacility(facilityId: string): void {
  
    this.branchesService.getAllBranches(facilityId).subscribe({
      next: (res) => {
        this.branches = res;
        this.isLoading = false;
        console.log(this.branches)
      },
      error: (err) => {
        console.error('Error fetching facilities:', err);
        this.branches = [];
        this.isLoading = false;
      }
    });
  
    
  }
}