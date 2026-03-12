import { Component, inject, OnInit, AfterViewInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../../services/claim-service';
import { PolicyService } from '../../../services/policy-service';
import { AdminService } from '../../../services/admin';

declare const lucide: any;

@Component({
  selector: 'app-submit-claim',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './submit-claim.html',
  styleUrl: './submit-claim.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitClaim implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimService);
  private policyService = inject(PolicyService);
  private adminService = inject(AdminService);
  private router = inject(Router);

  policies = signal<any[]>([]);
  loading = signal<boolean>(true);
  submitting = signal<boolean>(false);

  get f() { return this.form.controls; }

  form = this.fb.group({
    policyId: ['', Validators.required],
    claimAmount: ['', [Validators.required, Validators.min(1)]],
    claimDescription: ['', [Validators.required, Validators.minLength(10)]]
  });

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.adminService.title.set('Submit Claim');

    // Handle pre-selection of policy from query parameters
    const preSelectedPolicy = this.route.snapshot.queryParamMap.get('policyId');

    // Safety fallback for loading
    setTimeout(() => {
      if (this.loading()) this.loading.set(false);
    }, 5000);

    this.policyService.getMyPolicies().subscribe({
      next: (res) => {
        this.policies.set(res || []);
        this.loading.set(false);

        // If a policyId was provided in the URL, select it now that policies are loaded
        if (preSelectedPolicy) {
          this.form.patchValue({ policyId: preSelectedPolicy });
        }
      },
      error: (err) => {
        console.error("Failed to load policies for claim", err);
        this.loading.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    this.refreshIcons();
  }

  private refreshIcons(): void {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 0);
  }

  submit(): void {
    if (this.form.invalid || this.submitting()) return;

    this.submitting.set(true);
    this.claimService.submitClaim(this.form.value).subscribe({
      next: () => {
        alert("Claim submitted successfully. Our team will review the incident.");
        this.router.navigate(['/company/claim-history']);
      },
      error: (err) => {
        console.error("Claim submission failed", err);
        const msg = err.error?.message || "Failed to submit claim. Please check your connection and try again.";
        alert(msg);
        this.submitting.set(false);
      }
    });
  }
}
