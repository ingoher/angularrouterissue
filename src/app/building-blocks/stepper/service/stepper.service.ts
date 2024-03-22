import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  onNext: Subject<void> = new Subject<void>();
  onPrevious: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({});
  formData?: BehaviorSubject<FormGroup>;

  constructor(private router: Router) {}

  next(formData?: FormGroup): void {
    if (formData) {
      this.formData = new BehaviorSubject<FormGroup>(formData);
    }
    this.onNext.next();
  }

  previous(formData?: FormGroup): void {
    if (formData) {
      this.formData = new BehaviorSubject<FormGroup>(formData);
    }
    this.onPrevious.next();
  }

  async cancel(path: string) {
    await this.router.navigate([path])
  }
}
