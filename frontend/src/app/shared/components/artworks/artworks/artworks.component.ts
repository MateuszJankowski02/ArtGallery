import { FetchArtworksService } from '../../../services/fetch-artworks/fetch-artworks.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicArtwork } from '../../../interfaces/BasicArtwork';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LazyLoadImageDirective } from '../../../directives/lazy-load-image/lazy-load-image.directive';


@Component({
  selector: 'app-artworks',
  imports: [],
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss'
})
export class ArtworksComponent {
  @Input() categoryId: number | null = null;
  @Input() showUserArtworks: boolean = false;
  artworks: BasicArtwork[] = [];
  selectedImageUrl: string | null = null;
  page: number = 1;
  throttle = 300;
  scrollDistance = 2;
  loading: boolean = false;
  allLoaded: boolean = false;
  //categoryId: number | null = null;


  constructor(private fetchArtworksService: FetchArtworksService) {}

  ngOnInit(): void {
    this.loadArtworks();
  }

  async loadArtworks(): Promise<void> {
    this.loading = true;

    const response = await this.fetchArtworksService.getArtworks(this.page, this.categoryId || undefined);

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

  onScroll(): void {
    if (this.loading || this.allLoaded) return;
    this.page++;
    this.loadArtworks();
  }

  resetGallery(): void {
    this.artworks = [];
    this.page = 1;
    this.allLoaded = false;
  }

  showFullscreen(artworkUrl: string): void {
    this.selectedImageUrl = artworkUrl;
  }

  hideFullscreen(): void {
    this.selectedImageUrl = null;
  }

}
