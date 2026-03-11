import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {

  http = inject(HttpClient);

  api = "http://localhost:8080/api/claims";

  // -----------------------------
  // Company actions
  // -----------------------------

  submitClaim(data:any){
    return this.http.post(`${this.api}/submit`, data);
  }

  getCompanyClaims(){
    return this.http.get<any[]>(`${this.api}/company`);
  }

  getClaimsForPolicy(policyId:number){
    return this.http.get<any[]>(`${this.api}/policy/${policyId}`);
  }

  // -----------------------------
  // Admin actions
  // -----------------------------

  getAllClaims(){
    return this.http.get<any[]>(`${this.api}/admin/allClaims`);
  }

  approveClaim(claimId:number, verifiedLoss:number){
    return this.http.put(
      `${this.api}/admin/${claimId}/approve`,
      { verifiedLoss: verifiedLoss }
    );
  }

  rejectClaim(claimId:number){
    return this.http.put(
      `${this.api}/admin/${claimId}/reject`,
      {}
    );
  }

}