import { Component, inject, OnInit, AfterViewInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../../services/policy-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
        console.log(this.policies);
        this.loading.set(false);
        this.refreshIcons();
      },
      error: (err) => {
        console.error("Failed to load policies", err);
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

}
