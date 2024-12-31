import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FetchRandomImageService } from '../../../../core/services/fetch-random-image.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Observable, interval, Subscription, forkJoin, of } from 'rxjs';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        animate('2000ms ease-in', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 0, offset: 0.5 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ]),
      transition(':leave', [
        animate('2000ms ease-out', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 1, offset: 0.5 }),
          style({ opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})

export class CarouselComponent implements OnInit{
  imageURLs$: Observable<string[] | null> = new Observable<string[] | null>();
  loadedCount: number = 0;
  subscription : Subscription = new Subscription();

  constructor(
    public fetchRandomImageService: FetchRandomImageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadRandomURLs();
      const source = interval(10000);
      this.subscription = source.subscribe(() => this.loadRandomURLs());
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadRandomURLs(): void {
    forkJoin([
      this.fetchRandomImageService.fetchRandomImageURL(),
      this.fetchRandomImageService.fetchRandomImageURL(),
      this.fetchRandomImageService.fetchRandomImageURL()
    ]).subscribe(urls => {
      this.imageURLs$ = of(urls);
      this.loadedCount = 0; // reset before images load
    });
  }

  onImageLoad(): void {
    this.loadedCount++;
    if (this.loadedCount === 3) {
      // all images have fully loaded
    }
  }

  trackByUrl(index: number, imageURL: string): string {
    return imageURL;
  }

}

