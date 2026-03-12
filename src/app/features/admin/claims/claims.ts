import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../../services/claim-service';
import { AdminService } from '../../../services/admin';

declare const lucide: any;

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claims.html',
  styleUrl: './claims.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Claims implements OnInit, AfterViewInit {
  claimService = inject(ClaimService);
  adminService = inject(AdminService);

  claims = signal<any[]>([]);
  loading = signal(true);
  statusFilter = signal<string>('');
  verifiedLossInputs: { [key: number]: number } = {};

  totalClaims = computed(() => this.claims().length);
  submittedClaimsCount = computed(() => this.claims().filter(c => c.status === 'SUBMITTED').length);
  approvedClaimsCount = computed(() => this.claims().filter(c => c.status === 'APPROVED').length);
  totalPayout = computed(() =>
    this.claims().reduce((sum, claim) => sum + (claim.payoutAmount || 0), 0)
  );

  filteredClaims = computed(() => {
    const status = this.statusFilter();
    if (!status) return this.claims();
    return this.claims().filter(c => c.status === status);
  });

  ngOnInit(): void {
    this.adminService.title.set("Claims Dashboard");

    this.claimService.getAllClaims().subscribe({
      next: (data: any[]) => {
        this.claims.set(data || []);
        this.loading.set(false);
        this.refreshIcons();
      },
      error: (err) => {
        console.error("Failed to load claims", err);
        const msg = err.error?.message || "Failed to load claims";
        alert(msg);
        this.loading.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    this.refreshIcons();
  }

  filterClaims(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.statusFilter.set(target.value);
    this.refreshIcons();
  }

  private refreshIcons(): void {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 0);
  }

  approveClaim(claim: any) {
    const verifiedLoss = this.verifiedLossInputs[claim.claimId];

    if (!verifiedLoss) {
      alert("Enter verified loss");
      return;
    }

    this.claimService.approveClaim(claim.claimId, verifiedLoss).subscribe({
      next: () => {
        this.claims.update(claims => claims.map(c =>
          c.claimId === claim.claimId
            ? { ...c, status: "APPROVED", verifiedLoss: verifiedLoss, payoutAmount: verifiedLoss }
            : c
        ));
        this.refreshIcons();
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.message || "Failed to approve claim";
        alert(msg);
      }
    });
  }

  rejectClaim(claim: any) {
    this.claimService.rejectClaim(claim.claimId).subscribe({
      next: () => {
        this.claims.update(claims => claims.map(c =>
          c.claimId === claim.claimId
            ? { ...c, status: "REJECTED" }
            : c
        ));
        this.refreshIcons();
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.message || "Failed to reject claim";
        alert(msg);
      }
    });
  }
}
