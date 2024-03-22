import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  OrderAddressComponent,
  OrderTypeComponent,
  OrderWizardComponent,
} from './components';

const routes: Routes = [
  {
    path: 'create',
    component: OrderWizardComponent,
    data: {
      breadcrumb: { label: 'orderEntry' },
      skipDeactivateCheckUrls: ['/orders/create/confirmation'],
    },
    title: 'create',
    children: [
      {
        path: 'type',
        component: OrderTypeComponent,
        data: { animation: 'step0' },
        title: 'type',
      },
      {
        path: 'address',
        component: OrderAddressComponent,
        data: { animation: 'step2' },
        title: 'address',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
