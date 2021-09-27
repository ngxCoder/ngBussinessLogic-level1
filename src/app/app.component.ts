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
  subscription: Subscription;

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
    this.subscription = this.shareholderControl.valueChanges.subscribe(
      (value) => {
        if (value) {
          console.log(value);
          this.sharesControl.setValidators([Validators.required]);
        } else {
          this.sharesControl.clearValidators();
        }

        this.sharesControl.updateValueAndValidity();
      }
    );
  }

  get shareholderControl() {
    return this.form.get('shareholderRole');
  }

  get sharesControl() {
    return this.form.get('shares');
  }

  get isAShareholder() {
    console.log('asking for shareholders');
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
    this.subscription.unsubscribe();
  }
}
