import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacilitiesService } from '../../../services/facility-service/facilities.service';
import { environment } from '../../../environments/environment';
import { CreateFacilityDialogComponent } from '../components/dialogs/create-facility-dialog/create-facility-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonToArrayPipe } from '../../SuperAdmin/json-to-array.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,JsonToArrayPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  facilities: any[] = [];
  isLoading: boolean = true;

 constructor(private facilityService: FacilitiesService, private router : Router,private dialog: MatDialog) {}
ngOnInit(): void {
    this.fetchFacilities();
    
  }

fetchFacilities(): void {
    this.facilityService.getAllFacilities().subscribe({
      next: (res) => {
        this.facilities = res;
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
  
  this.router.navigate([`Home/${facilityId}/branches`]);
    
  }
}
