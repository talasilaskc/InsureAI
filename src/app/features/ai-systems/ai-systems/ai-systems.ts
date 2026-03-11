import { Component, inject, OnInit, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin';
import { AiSystemService } from '../../../services/ai-system-service';
import { RouterLink } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-ai-systems',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-systems.html',
  styleUrl: './ai-systems.css',
})
export class AiSystems implements OnInit, AfterViewInit {
  adminService: AdminService = inject(AdminService);
  aiService: AiSystemService = inject(AiSystemService);

  systems = signal<any[]>([]);
  loading = signal<boolean>(true);

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  ngOnInit(): void {
    this.adminService.title.set('AI Systems');
    console.log("AiSystems init - fetching from service...");

    // Timeout fallback to prevent stuck spinner if call hangs indefinitely
    setTimeout(() => {
      if (this.loading()) {
        console.warn("AiSystems: API call taking too long, force-clearing loading state.");
        this.loading.set(false);
      }
    }, 5000);

    this.aiService.getSystems().subscribe({
      next: (res) => {
        console.log("AiSystems: received data", res);
        this.systems.set(res || []);
        this.loading.set(false);
      },
      error: (err) => {
        console.error("AiSystems: fetch error", err);
        this.loading.set(false);
      }
    });
  }

}
