import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrderWizardFormService } from '../../../../services/order-wizard/order-wizard-form.service';
import { OrderWizardService } from '../../../../services/order-wizard/order-wizard-service';
import { StepperService } from 'src/app/building-blocks/stepper/service/stepper.service';

@Component({
  selector: 'order-wizard-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.scss'],
  providers: [],
})
export class OrderAddressComponent {
  searchString = new FormControl('');
  iconSrc = '';
  persistAddress: string = '';
  isLoadingData = false;
  isSearchTriggered = false;
  pageIndex = 0;
  pageSize = 20;
  searchQuery: string = '';
  filterStorageKey: string = 'orderAddressFilter';

  constructor(
    public orderWizardService: OrderWizardService,
    public orderWizardFormService: OrderWizardFormService,
    private stepperService: StepperService,
  ) {}

  back() {
    this.stepperService.previous();
  }
}
