import { animate, style, transition, trigger } from '@angular/animations';

const ANIMATION_TRANSITION_TIME: string = '300ms';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(ANIMATION_TRANSITION_TIME, style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(ANIMATION_TRANSITION_TIME, style({ opacity: 0 }))
  ])
]);
