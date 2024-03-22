import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrderWizardFormService {
  orderForm!: FormGroup;

  constructor() {
    this.initNewOrderForm();
  }

  initNewOrderForm() {
    this.orderForm = new FormGroup({
      orderType: new FormControl(''),
      addressId: new FormControl(''),
      customerInformation: new FormGroup({
        customer: new FormGroup({
          companyName: new FormControl(''),
          legalForm: new FormControl(''),
          taxId: new FormControl(''),
          commercialRegister: new FormControl(''),
          salutation: new FormControl('', Validators.required),
          title: new FormControl(''),
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          birthdate: new FormControl('', Validators.required),
          street: new FormControl(''),
          houseNumber: new FormControl(''),
          houseSuffix: new FormControl(''),
          postalCode: new FormControl(''),
          city: new FormControl(''),
          urbanDistrict: new FormControl(''),
          email: new FormControl('', Validators.required),
          areaCodePhone: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(5),
            Validators.pattern('^0\\d*$'),
          ]),
          phone: new FormControl('', [
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern('^[1-9]\\d*$'),
          ]),
          areaCodeMobile: new FormControl('', [
            Validators.minLength(4),
            Validators.maxLength(5),
            Validators.pattern('^0\\d*$'),
          ]),
          mobile: new FormControl('', [
            Validators.minLength(5),
            Validators.maxLength(15),
            Validators.pattern('^[1-9]\\d*$'),
          ]),
          itemizedBill: new FormControl(''),
          phonebookEntry: new FormControl(''),
          marketingAgreements: new FormGroup({
            email: new FormControl(''),
            phone: new FormControl(''),
            post: new FormControl(''),
          }),
        }),
      }),
    });
  }

  get fullOrderForm(): FormGroup {
    return this.orderForm as FormGroup;
  }

  get customerForm(): FormGroup {
    return this.orderForm
      .get('customerInformation')
      ?.get('customer') as FormGroup;
  }
}
