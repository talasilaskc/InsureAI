import { Component, inject, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AiSystemService } from '../../../services/ai-system-service';

declare const lucide: any;

@Component({
  selector: 'app-register-ai-system',
  imports: [ReactiveFormsModule],
  templateUrl: './register-ai-system.html',
  styleUrl: './register-ai-system.css'
})
export class RegisterAiSystem implements AfterViewInit {

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  fb = inject(FormBuilder);
  router = inject(Router);
  aiService = inject(AiSystemService);

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
        alert("Failed to register AI system. Please check your network and try again.");
      }

    });

  }

  cancel() {
    this.router.navigate(['/company/ai-system']);
  }

}