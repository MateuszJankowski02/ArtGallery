import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { CategoriesComponent } from '../categories/categories.component';
import { LazyLoadImageDirective } from '../../../../shared/directives/lazy-load-image/lazy-load-image.directive';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ArtworksComponent } from '../../../../shared/components/artworks/artworks/artworks.component';


@Component({
  selector: 'app-gallery',
  imports: [
    MainHeaderComponent,
    CategoriesComponent,
    ArtworksComponent,
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{
  selectedImageUrl: string | null = null;
  page: number = 1;
  categoryId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('categoryId');
      console.log('Category ID:', id);
      this.categoryId = id ? parseInt(id, 10) : null;
    });
  }

  onClickUploadArtwork(): void {
    this.router.navigate(['/upload_artwork']);
  }

}
