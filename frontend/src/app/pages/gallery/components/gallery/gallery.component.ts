import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { CategoriesComponent } from '../categories/categories.component';
import { BasicArtwork } from '../../interfaces/BasicArtwork';
import { FetchArtworksService } from '../../services/fetch-artworks/fetch-artworks.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LazyLoadImageDirective } from '../../../../shared/directives/lazy-load-image/lazy-load-image.directive';

@Component({
  selector: 'app-gallery',
  imports: [
    MainHeaderComponent,
    CategoriesComponent,
    InfiniteScrollDirective,
    LazyLoadImageDirective,
    CommonModule
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{
  artworks: BasicArtwork[] = [];
  page: number = 1;
  throttle = 300;
  scrollDistance = 2;
  loading: boolean = false;
  allLoaded: boolean = false;

  constructor(private fetchArtworksService: FetchArtworksService) {}

  ngOnInit(): void {
    this.loadArtworks();
  }

  onScroll(): void {
    if (this.loading || this.allLoaded) return;
    this.page++;
    this.loadArtworks();
  }

  async loadArtworks(): Promise<void> {
    this.loading = true;

    const response = await this.fetchArtworksService.getArtworks(this.page);

    if (response.status === 200) {
      console.log('Artworks fetched successfully:', response.data);
      console.log('Status:', response.status);
      this.artworks = [...this.artworks, ...response.data.results];
      if (!response.data.next){
        this.allLoaded = true;
      }
    }else if(response.status === 404){
      console.log('Page not found');
      this.allLoaded = true;
    }else {
      console.log('An error occurred while fetching artworks');
      console.log('Status:', response.status);
    }
    this.loading = false;
  }

}
