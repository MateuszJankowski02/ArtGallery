import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FetchRandomImageService } from '../../../../core/services/fetch-random-image.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Observable, interval, Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit{
  imageSrc: String | null = '';
  imageURLs$: Observable<string[] | null> = new Observable<string[] | null>();
  subscription : Subscription = new Subscription();

  constructor(
    public fetchRandomImageService: FetchRandomImageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      //this.loadRandomImage();
      this.loadRandomURLs();
      const source = interval(10000);
      //this.subscription = source.subscribe(() => this.loadRandomImage());
      this.subscription = source.subscribe(() => this.loadRandomURLs());

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /*
  private loadRandomImage(): void {
    this.fetchRandomImageService.fetchRandomImageURL(200, 300)
      .subscribe(imageURL => {
        this.imageSrc = imageURL;
        console.log(this.imageSrc);
      });
  }
  */

  private loadRandomURLs(): void {
    this.imageURLs$ = forkJoin([
      this.fetchRandomImageService.fetchRandomImageURL(),
      this.fetchRandomImageService.fetchRandomImageURL(),
      this.fetchRandomImageService.fetchRandomImageURL()
    ]);
  }

}

