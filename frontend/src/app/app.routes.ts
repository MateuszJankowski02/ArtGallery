import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/components/landing/landing.component';

export const routes: Routes = [

  { path: '', component: LandingComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
