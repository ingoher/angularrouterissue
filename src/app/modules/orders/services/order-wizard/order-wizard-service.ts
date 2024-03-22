import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { OrderWizardStepsURL } from '../../enums/order-wizars-steps';

import { OrderWizardFormService } from './order-wizard-form.service';
import { Step } from 'src/app/building-blocks/stepper/models';

@Injectable({
  providedIn: 'root',
})
export class OrderWizardService {
  orderWizardSteps: Step[] = [
    {
      label: 'orders.orderWizard.stepMainTitle.orderType',
      path: OrderWizardStepsURL.CREATE_ORDER_TYPE_URL,
      isDisabled: false,
      isVisible: true,
    },
    {
      label: 'orders.orderWizard.stepMainTitle.address',
      path: OrderWizardStepsURL.CREATE_ORDER_ADDRESS_URL,
      isDisabled: true,
      isVisible: true,
    },
  ];

  // for registration of changes for options reload
  public tariffIdForOptions: string = '';

  private _orderAddressUrl = 'search/addressFull/filter';
  private _addressSearchString: string = '';
  private _wizardSteps$ = new BehaviorSubject<Step[]>(this.orderWizardSteps);

  constructor(private orderWizardFormService: OrderWizardFormService) {}

  switchAddressesPage(page: PageEvent) {}

  setStepEnabled(stepEnum: OrderWizardStepsURL) {
    const wizardStepsCopy: Step[] = JSON.parse(
      JSON.stringify(this._wizardSteps$.value),
    );
    const foundStep = wizardStepsCopy.find((step) => step.path === stepEnum);

    if (foundStep) {
      foundStep.isDisabled = false;
      this.setWizardSteps(wizardStepsCopy);
    }
  }

  restartWizardSteps() {
    this.orderWizardFormService.initNewOrderForm();
    this.tariffIdForOptions = '';
    const originalWizardSteps = [...this.orderWizardSteps];
    this.setWizardSteps(originalWizardSteps);
  }

  setWizardSteps(steps: Step[]) {
    this._wizardSteps$.next(steps);
  }

  getWizardStepsObservable(): Observable<Step[]> {
    return this._wizardSteps$;
  }
}
