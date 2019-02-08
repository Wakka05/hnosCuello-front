import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.less']
})
export class HeaderDesktopComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {
  }

  private goHome() {
    this.router.navigateByUrl('/');
  }
}
