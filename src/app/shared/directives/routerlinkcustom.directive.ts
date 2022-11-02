import { Directive, Input, Optional } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Directive({
  selector: '[externalLink]',
})
export class RouterLinkCustomDirective {
  @Input() externalLink: string;

  constructor(
    // Inject RouterLinkWithHref
    @Optional() link: RouterLinkWithHref
  ) {
    if (!link) {
      return;
    }
    // Save original onClick method
    const onClick = link.onClick;
    link.onClick = (...args: any[]) => {
      if (
        (this.externalLink.includes('https:') ||
          this.externalLink.includes('http:')) &&
        this.externalLink != 'javascript:void(0);'
      ) {
        // Process external url
        window.open(this.externalLink, '_self');
        return false;
      } else {
        if (this.externalLink != 'javascript:void(0);') {
          // Process internal url by calling routerLink original method
          return onClick.apply(link, args);
        } else {
          return null;
        }
      }
    };
  }
}
