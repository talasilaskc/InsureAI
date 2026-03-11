import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  http = inject(HttpClient);

  getDashboard(){
  return this.http.get("http://localhost:8080/api/company/dashboard");
}
}
