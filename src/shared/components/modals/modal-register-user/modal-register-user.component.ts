import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-modal-register-user',
  templateUrl: './modal-register-user.component.html',
  styleUrls: ['./modal-register-user.component.less']
})
export class ModalRegisterUserComponent implements OnInit {

  public loginForm: FormGroup;

  public error: boolean;
  public errorMessage: string;
  public showSpinner = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalRegisterUserComponent>,
    public formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      name: [null, Validators.required],
      surnames: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  goToLogin(): void {
    if (this.data.observer) {
      this.data.observer.next('login');
      this.data.observer.complete();
    } else {
      of(false);
    }
    this.dialogRef.close();
  }

  discardRegister() {
    if (this.data.observer) {
      this.data.observer.next(null);
      this.data.observer.complete();
    }
    this.dialogRef.close();
  }

  registerUser(): void {
    if (this.loginForm.valid) {
      this.showSpinner = true;
      this.authService.registerUser(this.loginForm.value).subscribe( val => {
        this.showSpinner = false;
        this.error = false;
        this.close();
      }, err => {
        this.error = true;
        this.showSpinner = false;
      })
    }
  }

  close(): void {
    if (this.data.observer) {
      this.data.observer.next('logged');
      this.data.observer.complete();
    }
    this.dialogRef.close();
  }

}
