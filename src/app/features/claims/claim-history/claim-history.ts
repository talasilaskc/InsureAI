import { Component, inject, OnInit, AfterViewInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin';
import { ClaimService } from '../../../services/claim-service';

declare const lucide: any;

@Component({
  selector: 'app-claim-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-history.html',
  styleUrl: './claim-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimHistory implements OnInit, AfterViewInit {
  private adminService = inject(AdminService);
  private claimService = inject(ClaimService);

  claims = signal<any[]>([]);
  loading = signal<boolean>(true);

  // Stats computed from claims
  totalClaimed = computed(() =>
    this.claims().reduce((sum, c) => sum + (c.claimAmount || 0), 0)
  );

  approvedAmount = computed(() =>
    this.claims()
      .filter(c => c.status === 'APPROVED')
      .reduce((sum, c) => sum + (c.payoutAmount || 0), 0)
  );

  ngOnInit(): void {
    this.adminService.title.set('Claim History');

    // Safety fallback
    setTimeout(() => {
      if (this.loading()) this.loading.set(false);
    }, 5000);

    this.claimService.getCompanyClaims().subscribe({
      next: (res: any) => {
        this.claims.set((res as any[]) || []);
        this.loading.set(false);
        this.refreshIcons();
      },
      error: (err) => {
        console.error("Failed to fetch claims", err);
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
}
