import { trigger, state, style, animate, transition, group } from '@angular/animations';

export const slideUpDownAnimation = trigger('slideUpDownAnimation', [
  state(
    'down',
    style({
      'max-height': '2000px',
      opacity: '1',
      visibility: 'visible',
    })
  ),
  state(
    'up',
    style({
      'max-height': '0px',
      opacity: '0',
      visibility: 'hidden',
    })
  ),
  transition('down => up', [
    group([
      animate(
        `150ms ease-in-out`,
        style({
          opacity: '0',
        })
      ),
      animate(
        '350ms ease-in-out',
        style({
          'max-height': '0px',
        })
      ),
      animate(
        '450ms ease-in-out',
        style({
          visibility: 'hidden',
        })
      ),
    ]), // End Group
  ]), // End Transition
  transition('up => down', [
    group([
      animate(
        '1ms ease-in-out',
        style({
          visibility: 'visible',
        })
      ),
      animate(
        '250ms ease-in-out',
        style({
          'max-height': '2000px',
        })
      ),
      animate(
        '450ms ease-in-out',
        style({
          opacity: '1',
        })
      ),
    ]), // End Group
  ]), // End Transition
]);
