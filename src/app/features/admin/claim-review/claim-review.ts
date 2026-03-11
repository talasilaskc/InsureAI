import { Component, inject, OnInit, signal, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../../services/claim-service';
import { AdminService } from '../../../services/admin';

declare const lucide: any;

@Component({
  selector: 'app-claim-review',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './claim-review.html',
  styleUrl: './claim-review.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimReview implements OnInit, AfterViewInit {

  private claimService = inject(ClaimService);
  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  claim = signal<any>(null);
  verifiedLoss = signal<number>(0);
  loading = signal(true);
  processing = signal(false);

  ngOnInit(): void {
    this.adminService.title.set("Claim Review");

    const id = this.route.snapshot.params['id'];

    this.claimService.getAllClaims().subscribe({
      next: (data: any) => {
        const found = data.find((c: any) => c.claimId == id);
        if (found) {
          this.claim.set(found);
          this.verifiedLoss.set(found.verifiedLoss || 0);
        } else {
          alert("Claim could not be located in the current database.");
          this.router.navigate(['/admin/all-claims']);
        }
        this.loading.set(false);
        this.refreshIcons();
      },
      error: (err) => {
        console.error("Failed to fetch claims data:", err);
        alert("An error occurred while fetching claims data.");
        this.router.navigate(['/admin/all-claims']);
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

  updateVerifiedLoss(val: number) {
    this.verifiedLoss.set(val);
  }

  approve() {
    if (this.processing() || !this.claim()) return;
    if (!confirm(`Are you sure you want to APPROVE this claim with a verified payout of ₹${this.verifiedLoss().toLocaleString()}?`)) return;

    this.processing.set(true);
    this.claimService.approveClaim(
      this.claim().claimId,
      this.verifiedLoss()
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/all-claims']);
      },
      error: (err) => {
        console.error("Failed to approve claim", err);
        alert("Verification logic failed to execute.");
        this.processing.set(false);
      }
    });
  }

  reject() {
    if (this.processing() || !this.claim()) return;
    if (!confirm("Are you sure you want to REJECT this claim officially?")) return;

    this.processing.set(true);
    this.claimService.rejectClaim(
      this.claim().claimId
    ).subscribe({
      next: () => {
        this.router.navigate(['/admin/all-claims']);
      },
      error: (err) => {
        console.error("Failed to reject claim", err);
        alert("Rejection logic failed to execute.");
        this.processing.set(false);
      }
    });
  }

}