import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ModalRegisterUserComponent } from '../modals/modal-register-user/modal-register-user.component';
import { MatDialog } from "@angular/material";
import { ModalLoginComponent } from '../modals/modal-login/modal-login.component';
import { Observable } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.less']
})
export class HeaderDesktopComponent implements OnInit {

  constructor(public router: Router, private dialog: MatDialog, private authService: AuthService) {}

  public user: User;
  private scroll: number;
  private prevPosition: number;
  private menuOpen: boolean;

  @Output() _logout = new EventEmitter<boolean>();

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
    this.authService.user.subscribe( val => {
      this.user = val;
    });
  }

  isOpened(): void {
    this.menuOpen = true;
  }

  isClose(): void {
    this.menuOpen = false;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this._logout.emit(true);
  }

  goUserProfile(): void {
    this.router.navigate(['profile']);
  }

  registerUser(): void {
    const obs = new Observable<any>(observer => {
      const dialogRef = this.dialog.open(ModalRegisterUserComponent, {
        data: {
          observer: observer ? observer : null
        },
        height: '680px',
        width: '500px',
      });
    });
    obs.subscribe(val => {
      if (val && val === 'signUp') {
        // this.registerUser();
      } else if (val && val === 'login') {
        this.login();
      }
    });
  }

  login(): void {
    const obs = new Observable<any>(observer => {
      const dialogRef = this.dialog.open(ModalLoginComponent, {
        data: {
          observer: observer ? observer : null
        },
        // height: '400px',
        width: '500px',
        disableClose: true
      });
    });
    
    obs.subscribe(val => {
      if (val && val === 'signUp') {
        this.registerUser();
      } else if (val && val === 'logged') {
        // this.login();
      }
    });
  }
}
