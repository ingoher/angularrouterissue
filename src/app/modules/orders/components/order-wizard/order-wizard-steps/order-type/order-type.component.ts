import { Component } from '@angular/core';

import { OrderWizardStepsURL } from '../../../../enums/order-wizars-steps';
import { OrderWizardFormService } from '../../../../services/order-wizard/order-wizard-form.service';
import { OrderWizardService } from 'src/app/modules/orders/services/order-wizard/order-wizard-service';
import { StepperService } from 'src/app/building-blocks/stepper/service/stepper.service';

@Component({
  selector: 'order-wizard-order-type',
  templateUrl: './order-type.component.html',
  styleUrls: ['./order-type.component.scss'],
})
export class OrderTypeComponent {
  constructor(
    private stepperService: StepperService,
    private orderWizardFormService: OrderWizardFormService,
    private orderWizardService: OrderWizardService,
  ) {}

  next() {
    this.orderWizardFormService.orderForm.controls['orderType'].setValue(0);
    this.orderWizardService.setStepEnabled(
      OrderWizardStepsURL.CREATE_ORDER_TYPE_URL,
    );
    this.orderWizardService.setStepEnabled(
      OrderWizardStepsURL.CREATE_ORDER_ADDRESS_URL,
    );
    this.stepperService.next(this.orderWizardFormService.orderForm);
  }
}
