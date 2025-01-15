import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    animate('1000ms ease-in', keyframes([
      style({ opacity: 0, offset: 0 }),
      style({ opacity: 0, offset: 0.5 }),
      style({ opacity: 1, offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('1000ms ease-out', keyframes([
      style({ opacity: 1, offset: 0 }),
      style({ opacity: 1, offset: 0.5 }),
      style({ opacity: 0, offset: 1 })
    ]))
  ])
]);
/*
export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    animate('500ms ease-out', keyframes([
      style({ transform: 'translateY(20%)', opacity: 0, offset: 0 }),
      style({ transform: 'translateY(10%)', opacity: 0.5, offset: 0.5 }),
      style({ transform: 'translateY(0)', opacity: 1, offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('500ms ease-out', keyframes([
      style({ transform: 'translateY(0)', opacity: 1, offset: 0 }),
      style({ transform: 'translateY(10%)', opacity: 0.5, offset: 0.5 }),
      style({ transform: 'translateY(20%)', opacity: 0, offset: 1 })
    ]))
  ])
]);
*/
