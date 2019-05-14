import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.less']
})
export class HeaderDesktopComponent implements OnInit {

  constructor(public router: Router) {}

  public user: User;
  private scroll: number;
  private prevPosition: number;
  private menuOpen: boolean;

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.scroll = window.scrollY || document.documentElement.scrollTop;
    if (this.menuOpen) {
      window.scrollTo(0, this.prevPosition);
    }

    this.prevPosition = window.pageYOffset;
  }

  ngOnInit() {
    
  }

  isOpened(): void {
    this.menuOpen = true;
  }

  isClose(): void {
    this.menuOpen = false;
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
