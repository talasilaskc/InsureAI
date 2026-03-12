import { Component, inject, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AiSystemService } from '../../../services/ai-system-service';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../services/company-service';
declare const lucide: unknown;

@Component({
  selector: 'app-register-ai-system',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-ai-system.html',
  styleUrl: './register-ai-system.css'
})
export class RegisterAiSystem implements AfterViewInit, OnInit {

  companyService = inject(CompanyService);
  fb = inject(FormBuilder);
  router = inject(Router);
  aiService = inject(AiSystemService);

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') {
      (lucide as any).createIcons();
    }
    
  }

  ngOnInit(): void {
    this.companyService.title.set("Register AI System");
  }

  get f() { return this.aiForm.controls; }

  aiForm = this.fb.group({

    name: ['', Validators.required],
    description: [''],

    ownershipType: ['', Validators.required],
    deploymentType: ['', Validators.required],

    businessCritical: [false],

    version: [''],

    modelType: ['', Validators.required],
    dataExposureCategory: ['', Validators.required],

    productionSince: ['']

  });

  submit() {

    if (this.aiForm.invalid) return;

    this.aiService.createSystem(this.aiForm.value).subscribe({

      next: () => {
        this.router.navigate(['/company/ai-system']);
      },
      error: (err) => {
        console.error("Failed to register AI system", err);
        const msg = err.error?.message || "Failed to register AI system. Please check your network and try again.";
        alert(msg);
      }

    });

  }

  cancel() {
    this.router.navigate(['/company/ai-system']);
  }

}