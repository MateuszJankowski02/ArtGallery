import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/components/landing/landing.component';
import { GalleryComponent } from './pages/gallery/components/gallery/gallery.component';
import { userAuthGuard } from './core/guards/user-auth.guard';
import { UserProfileComponent } from './pages/user-profile/components/user-profile/user-profile.component';
import { UploadArtworkComponent } from './pages/upload-artwork/components/upload-artwork/upload-artwork.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'gallery', component: GalleryComponent, canActivate: [userAuthGuard] },
  { path: 'gallery/:categoryId', component: GalleryComponent, canActivate: [userAuthGuard] },
  { path: 'user_profile', component: UserProfileComponent, canActivate: [userAuthGuard] },
  { path: 'upload_artwork', component: UploadArtworkComponent, canActivate: [userAuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]
