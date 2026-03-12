import { Component, inject, OnInit, AfterViewInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../../services/policy-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../../services/company-service';

declare const lucide: any;

@Component({
  selector: 'app-my-policies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './my-policies.html',
  styleUrl: './my-policies.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyPolicies implements OnInit, AfterViewInit {
  private policyService = inject(PolicyService);

  policies = signal<any[]>([]);
  searchTerm = signal<string>('');
  loading = signal<boolean>(true);
  companyService=inject(CompanyService);

  filteredPolicies = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.policies();

    return this.policies().filter(policy =>
      policy.policyId?.toString().includes(term) ||
      policy.status?.toLowerCase().includes(term) ||
      policy.aiSystemId?.toString().includes(term)
    );
  });

  ngAfterViewInit() {
    this.refreshIcons();
  }

  ngOnInit() {
    this.companyService.title.set('My Policies'); 
    console.log("MyPolicies init - loading your coverage...");

    // Safety fallback for loading state
    setTimeout(() => {
      if (this.loading()) {
        console.warn("MyPolicies: Fetch taking too long, clearing loading.");
        this.loading.set(false);
      }
    }, 5000);

    this.policyService.getMyPolicies().subscribe({
      next: (res) => {
        this.policies.set(res || []);
        console.log(this.policies());
        this.loading.set(false);
        this.refreshIcons();
      },
      error: (err) => {
        console.error("Failed to load policies", err);
        const msg = err.error?.message || "Failed to load policies";
        alert(msg);
        this.loading.set(false);
      }
    });
  }

  updateSearch(value: string) {
    this.searchTerm.set(value);
  }

  private refreshIcons() {
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 0);
  }

  getSystemIcon(aiSystemId: number): string {
    if(!aiSystemId) return 'cpu';
    const icons = ['bot', 'cpu', 'message-square', 'eye', 'shield-alert', 'sparkles', 'brain-circuit'];
    return icons[aiSystemId % icons.length];
  }

  getSystemColor(aiSystemId: number): string {
    if(!aiSystemId) return 'bg-slate-100 text-slate-600';
    const colors = [
      'bg-purple-100 text-purple-600',
      'bg-blue-100 text-blue-600',
      'bg-emerald-100 text-emerald-600',
      'bg-amber-100 text-amber-600',
      'bg-rose-100 text-rose-600',
      'bg-cyan-100 text-cyan-600',
      'bg-indigo-100 text-indigo-600'
    ];
    return colors[aiSystemId % colors.length];
  }

}
