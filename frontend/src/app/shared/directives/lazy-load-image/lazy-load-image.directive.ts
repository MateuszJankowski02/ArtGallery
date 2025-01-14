import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements OnInit {
  @Input('appLazyLoadImage') src: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const img: HTMLImageElement = this.el.nativeElement;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setAttribute(img, 'src', this.src);
          observer.unobserve(img);
        }
      });
    });

    observer.observe(img);
  }
}
