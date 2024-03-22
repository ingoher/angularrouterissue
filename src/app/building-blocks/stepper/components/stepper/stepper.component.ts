import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Step } from '../../models';
import { StepperService } from '../../service/stepper.service';

@Component({
  selector: 'mystepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  steps: Step[] = [];
  visibleSteps: Step[] = [];

  @Input()
  activeStepPath: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input()
  isFormValid: boolean = false;

  @Output()
  onStepChange = new EventEmitter<Step>();

  @Output()
  onNextClicked = new EventEmitter<FormGroup>();

  @Output()
  onPreviousClicked = new EventEmitter<FormGroup>();

  activeStep?: Step;
  prevDisabled: boolean = true;
  nextDisabled: boolean = true;
  private _subscriptions: Subscription[] = [];

  constructor(private stepperService: StepperService) {}

  ngOnInit() {
    this.subscribeToActiveStepPath();
    this.subscribeToStepperService();
    this.updateVisibleSteps();
  }

  ngOnChanges() {
    this.updateVisibleSteps();
  }

  setActiveStepPath(step: Step) {
    this.activeStep = step;
    this.onStepChange.emit(step);
    this.updateVisibleSteps();
  }

  setPreviousStep() {
    if (this.stepperService.formData && this.stepperService.formData.value !== undefined) {
      this.onPreviousClicked.emit(this.stepperService.formData.value.value);
    }
    if (this.activeStep) {
      const index = this.steps.findIndex(step => step.path === this.activeStep?.path);
      if (index - 1 >= 0) {
        this.activeStep = this.steps[index - 1];
        this.onStepChange.emit(this.activeStep);
        this.updateVisibleSteps();
      }
    }
  }

  setNextStep() {
    if (this.formIsValid) {
      if (this.stepperService.formData && this.stepperService.formData.value !== undefined) {
        this.onNextClicked.emit(this.stepperService.formData.value.value);
      }
      if (this.activeStep) {
        const index = this.steps.findIndex(step => step.path === this.activeStep?.path);
        if (this.steps.length > index + 1) {
          this.activeStep = this.steps[index + 1];
          this.onStepChange.emit(this.activeStep);
          this.updateVisibleSteps();
        }
      }
    }
  }

  isPreviousButtonDisabled(): void {
    if (this.currentIndex === 0) {
      this.prevDisabled = true;
    } else if (this.activeStep) {
      const index = this.steps.findIndex(step => step.path === this.activeStep?.path);
      if (index - 1 >= 0) {
        this.prevDisabled = this.steps[index - 1].isDisabled;
      }
    }
  }

  isNextButtonDisabled(): void {
    if (this.currentIndex === this.steps.length - 1) {
      this.nextDisabled = true;
      return;
    } else if (this.activeStep) {
      const index = this.steps.findIndex(step => step.path === this.activeStep?.path);
      if (this.steps.length > index + 1) {
        this.nextDisabled = this.steps[index + 1].isDisabled || !this.formIsValid;
      }
    }
  }

  updateVisibleSteps() {
    const activeIndex = this.activeStep ? this.steps.findIndex(step => step.path === this.activeStep?.path) : 0;
    let startIndex = Math.max(0, activeIndex - 1);
    this.isNextButtonDisabled();
    this.isPreviousButtonDisabled();
    if (activeIndex === this.steps.length - 1 && this.steps.length >= 3) {
      startIndex = activeIndex - 2;
    }

    const endIndex = startIndex + 3;
    this.visibleSteps = this.steps.slice(startIndex, endIndex);
  }

  private subscribeToActiveStepPath(): void {
    if (this.activeStepPath) {
      const subscription = this.activeStepPath.subscribe(stepPath => {
        this.activeStep = this.steps.find(step => stepPath.includes(step.path)) as Step;
      });
      this._subscriptions.push(subscription);
    }
  }

  private subscribeToStepperService(): void {
    const nextSubscription = this.stepperService.onNext.subscribe(() => this.setNextStep());
    const previousSubscription = this.stepperService.onPrevious.subscribe(() => this.setPreviousStep());
    this._subscriptions.push(nextSubscription, previousSubscription);
  }

  get formIsValid() {
    return this.stepperService.form.valid;
  }

  get currentIndex() {
    if (this.activeStep) {
      return this.steps.findIndex(step => step.path === this.activeStep?.path);
    }
    return 0;
  }

  get progress() {
    return ((this.currentIndex + 1) / this.steps.length) * 100;
  }

  ngOnDestroy(): void {
    while (this._subscriptions?.length > 0) {
      this._subscriptions.pop()?.unsubscribe();
    }
  }
}
