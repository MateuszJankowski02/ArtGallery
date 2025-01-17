import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FetchRandomImageService } from '../../../../shared/services/fetch-random-image/fetch-random-image.service';
import { isPlatformBrowser, CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, interval, Subscription, forkJoin, of } from 'rxjs';
import { fadeAnimation } from '../../animations/fade-animation';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [fadeAnimation]
})

export class CarouselComponent implements OnInit{
  allImagesLoaded = false;

  imageURLs$: Observable<string[] | null> = new Observable<string[] | null>();
  loadedCount: number = 0;
  numberOfURLs: number = 7;
  subscription : Subscription = new Subscription();


  constructor(
    public fetchRandomImageService: FetchRandomImageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadRandomURLs();
      const source = interval(20000);
      this.subscription = source.subscribe(() => this.loadRandomURLs());
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadRandomURLs(): void {
    const observables = Array.from({ length: this.numberOfURLs }, () =>
      this.fetchRandomImageService.fetchRandomImageURL(300, 450)
    );

    forkJoin(observables).subscribe(urls => {
      this.imageURLs$ = of(urls);
      this.loadedCount = 0;
    });
  }

  onImageLoad(): void {
    this.loadedCount++;
    if (this.loadedCount === 7) {
      this.allImagesLoaded = true;
    }
  }

  trackByUrl(index: number, imageURL: string): string {
    return imageURL;
  }

}

