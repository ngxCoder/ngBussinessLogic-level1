import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormGroup;
  directorSubscription: Subscription;
  shareHolderSubscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.roleValidators();
  }

  createForm() {
    this.form = this.fb.group({
      directorRole: [''],
      secretaryRole: [''],
      shareholderRole: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      shares: [''],
    });
  }

  roleValidators() {
    this.directorSubscription = this.directorControl.valueChanges.subscribe(
      (value) => {
        if (value) {
          this.lastnameControl.setValidators([Validators.required]);
        } else {
          this.lastnameControl.clearValidators();
        }

        this.lastnameControl.updateValueAndValidity();
      }
    );

    this.shareHolderSubscription =
      this.shareholderControl.valueChanges.subscribe((value) => {
        if (value) {
          this.sharesControl.setValidators([Validators.required]);
        } else {
          this.sharesControl.clearValidators();
        }

        this.sharesControl.updateValueAndValidity();
      });
  }

  get shareholderControl() {
    return this.form.get('shareholderRole');
  }

  get sharesControl() {
    return this.form.get('shares');
  }

  get directorControl() {
    return this.form.get('directorRole');
  }

  get lastnameControl() {
    return this.form.get('lastName');
  }

  get isAShareholder() {
    // console.log('asking for shareholders');
    return this.shareholderControl.value === true;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.directorSubscription.unsubscribe();
    this.shareHolderSubscription.unsubscribe();
  }
}
