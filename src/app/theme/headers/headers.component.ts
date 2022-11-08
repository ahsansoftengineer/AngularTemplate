import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SideNavService } from '../full-template/side-nav.service';

@Component({
  selector: 'aam-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit {
  isLight: boolean = false;
  constructor(
    public sideNav: SideNavService,
    public cdr: ChangeDetectorRef
    ) {}
  ngOnInit(): void {
    
  }
}
