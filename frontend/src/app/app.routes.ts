import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/components/landing/landing.component';
import { GalleryComponent } from './pages/gallery/components/gallery/gallery.component';
import { userAuthGuard } from './core/guards/user-auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gallery', component: GalleryComponent, canActivate: [userAuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
