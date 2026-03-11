import { Routes } from '@angular/router';

import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
    canActivate: [guestGuard]
  },
  {
    path: 'company',
    loadComponent: () => import('./shared/layout/company-layout/company-layout').then(m => m.CompanyLayout),
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_COMPANY' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/company/company_dashboard/dashboard').then(m => m.CompanyDashboard)
      },
      {
        path: 'ai-system',
        loadComponent: () => import('./features/ai-systems/ai-systems/ai-systems').then(m => m.AiSystems)
      },
      {
        path: 'register-ai-system',
        loadComponent: () => import('./features/ai-systems/register-ai-system/register-ai-system').then(m => m.RegisterAiSystem)
      },
      {
        path: 'risk-assessment',
        loadComponent: () => import('./features/risk-assessment/risk-assessment/risk-assessment').then(m => m.RiskAssessment)
      },
      {
        path: 'risk-assessment/:systemId',
        loadComponent: () => import('./features/risk-assessment/risk-assessment/risk-assessment').then(m => m.RiskAssessment)
      },
      {
        path: 'policy-types',
        loadComponent: () => import('./features/policies/policies/policies').then(m => m.Policies)
      },
      {
        path: 'my-policies',
        loadComponent: () => import('./features/policies/my-policies/my-policies').then(m => m.MyPolicies)
      },
      {
        path: 'submit-claim',
        loadComponent: () => import('./features/claims/submit-claim/submit-claim').then(m => m.SubmitClaim)
      },
      {
        path: 'claim-history',
        loadComponent: () => import('./features/claims/claim-history/claim-history').then(m => m.ClaimHistory)
      },
      {
        path: 'apply-policy/:policyId',
        loadComponent: () => import('./features/policies/apply-policy/apply-policy').then(m => m.ApplyPolicy)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./shared/layout/admin-layout/admin-layout').then(m => m.AdminLayout),
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.AdminDashboard)
      },
      {
        path: 'pending-policies',
        loadComponent: () => import('./features/admin/pending-policies/pending-policies').then(m => m.PendingPolicies)
      },
      {
        path: 'all-policies',
        loadComponent: () => import('./features/admin/policy-management/policy-management').then(m => m.PolicyManagement)
      },
      {
        path: 'admin-policies',
        loadComponent: () => import('./features/admin/admin-policies/admin-policies').then(m => m.AdminPolicies)
      },
      {
        path: 'all-claims',
        loadComponent: () => import('./features/admin/claims/claims').then(m => m.Claims)
      },
      {
        path: 'claim-review/:id',
        loadComponent: () => import('./features/admin/claim-review/claim-review').then(m => m.ClaimReview)
      },
      {
        path: 'policy-review/:id',
        loadComponent: () => import('./features/admin/policy-review/policy-review').then(m => m.PolicyReview)
      },
      {
        path: 'policy-types/create',
        loadComponent: () => import('./features/admin/policy-type-form/policy-type-form').then(m => m.PolicyTypeForm)
      },
      {
        path: 'policy-types/edit/:id',
        loadComponent: () => import('./features/admin/policy-type-form/policy-type-form').then(m => m.PolicyTypeForm)
      }
    ]
  }
];