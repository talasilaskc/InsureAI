import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public title = signal('');
  private http= inject(HttpClient);

  getPendingPolicies(){
    return this.http.get<any[]>("http://localhost:8080/api/admin/policies/pending");
  }

  approvePolicy(id:number){
    return this.http.put(`http://localhost:8080/api/admin/policies/${id}/approve`,{});
  }

  rejectPolicy(id:number){
    return this.http.put(`http://localhost:8080/api/admin/policies/${id}/reject`,{});
  }

  getPolicyById(id:number){
    return this.http.get<any[]>(`http://localhost:8080/api/admin/policies/${id}`);
  }

  getDashboard(){
    return this.http.get("http://localhost:8080/api/admin/dashboard");
  } 

  getAllPolicies(){
  return this.http.get<any[]>("http://localhost:8080/api/admin/policies");
  }

}
