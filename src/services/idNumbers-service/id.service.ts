import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private facilityId : string | null = null;
  private branchId : string | null = null;
  private tableId : string | null = null;
  constructor() { }

  setFacilityId(facilitiesId: string | null) {
    this.facilityId = facilitiesId;
  }
  getFacilityId() { 
  return this.facilityId;

  
}
setBranchId(branchId: string | null) {
  this.branchId = branchId;
}
getBranchId(){
  return this.branchId
}

setTableId(tableId: string | null){
this.tableId = tableId;
}
getTableId(){
  return this.tableId;
}
}
