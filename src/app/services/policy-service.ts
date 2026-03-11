import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  http = inject(HttpClient);
  api = "http://localhost:8080/api/policy-types";

  getPolicyTypes() {
    return this.http.get<any[]>(this.api);
  }

  issuePolicy(data: any) {

    return this.http.post(
      `http://localhost:8080/api/policies/issue`,
      data
    );

  }

  getMyPolicies() {

    return this.http.get<any[]>(
      "http://localhost:8080/api/policies/company"
    );

  }
}
