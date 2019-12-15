import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.less']
})
export class ModalLoginComponent implements OnInit {

  public loginForm: FormGroup;

  public error: boolean;
  public errorMessage: string;
  public showSpinner = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalLoginComponent>,
    public formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.showSpinner = true;
      this.authService.login(this.loginForm.value).subscribe( val => {
        this.showSpinner = false;
        this.error = false;
        this.close();
      }, err => {
        this.error = true;
        this.showSpinner = false;
      })
    }
  }
  
  signUp(): void {
    if (this.data.observer) {
      this.data.observer.next('signUp');
      this.data.observer.complete();
    } else {
      of(false);
    }
    this.dialogRef.close();
  }

  close(): void {
    if (this.data.observer) {
      this.data.observer.next('logged');
      this.data.observer.complete();
    }
    this.dialogRef.close();
  }

  discardLogin() {
    if (this.data.observer) {
      this.data.observer.next(null);
      this.data.observer.complete();
    }
    this.dialogRef.close();
  }

}
