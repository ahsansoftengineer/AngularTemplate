import { animate, state, style, transition, trigger } from "@angular/animations";

export const animations =  [
  trigger('openClose', [
    state('open', style({
      width: '240px',
      opacity: 1,
    })),
    state('closed', style({
      width: '60px',
      opacity: 0.8,
    })),
    transition('open => closed', [
      animate('0.6s ease')
    ]),
    transition('closed => open', [
      animate('0.4s ease')
    ]),
   
  ]),
]