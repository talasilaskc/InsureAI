import { Component, inject, OnInit, signal, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin';
import { CommonModule } from '@angular/common';

declare const lucide: any;

@Component({
  selector: 'app-policy-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './policy-review.html',
  styleUrl: './policy-review.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyReview implements OnInit, AfterViewInit {

  private adminService: AdminService = inject(AdminService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  policy = signal<any>(null);
  loading = signal(true);
  submitting = signal(false);

  ngOnInit(): void {
    this.adminService.title.set('Review Application');

    const id = this.route.snapshot.params['id'];

    this.adminService.getPolicyById(id).subscribe({
      next: (data: any) => {
        this.policy.set(data);
        this.loading.set(false);
        this.refreshIcons();
      },
      error: (err) => {
        console.error("Failed to load policy details", err);
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

  approvePolicy() {
    if (this.submitting() || !this.policy()) return;
    if (!confirm("Confirm approval of this policy application?")) return;

    this.submitting.set(true);
    this.adminService.approvePolicy(this.policy().id).subscribe({
      next: () => {
        this.router.navigate(['/admin/pending-policies']);
      },
      error: (err) => {
        console.error("Failed to approve policy", err);
        alert("Verification failed. Please try again.");
        this.submitting.set(false);
      }
    });
  }

  rejectPolicy() {
    if (this.submitting() || !this.policy()) return;
    if (!confirm("Are you sure you want to reject this policy application?")) return;

    this.submitting.set(true);
    this.adminService.rejectPolicy(this.policy().id).subscribe({
      next: () => {
        this.router.navigate(['/admin/pending-policies']);
      },
      error: (err) => {
        console.error("Failed to reject policy", err);
        alert("Verification failed. Please try again.");
        this.submitting.set(false);
      }
    });
  }

}