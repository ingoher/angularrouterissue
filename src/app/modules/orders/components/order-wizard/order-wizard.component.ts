import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterContentChecked,
  HostListener,
} from '@angular/core';
import {
  ChildrenOutletContexts,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { BehaviorSubject, Subscription, filter } from 'rxjs';

import { BaseLayoutService } from '../../../base-layout/services/base-layout';
import { OrderWizardFormService } from '../../services/order-wizard/order-wizard-form.service';
import { OrderWizardService } from '../../services/order-wizard/order-wizard-service';
import { Step } from 'src/app/building-blocks/stepper/models';

@Component({
  selector: 'order-wizard',
  templateUrl: './order-wizard.component.html',
  styleUrls: ['./order-wizard.component.scss'],
  animations: [],
})
export class OrderWizardComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  orderSteps: Step[] = [];
  activeStepPath!: BehaviorSubject<string>;
  _subscriptions: Subscription[] = [];

  displayStartIndex = 0;
  displayEndIndex = 10;

  exitPath: string = '/home';

  constructor(
    private contexts: ChildrenOutletContexts,
    private baseLayoutService: BaseLayoutService,
    private orderWizardService: OrderWizardService,
    public orderWizardFormService: OrderWizardFormService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
  ) {}

  /**
   * This event is always called up when the "Browser Back" or "Browser Forward" button is clicked.
   * A redirect to the start page calls up the exit dialog. As it is not possible to intervene in the navigation
   * of the "Browser Back" button and navigation to the previous page cannot be avoided, a setTimeout must be set
   * on the start page navigation so that the URL is not overwritten in Router Guard.
   */
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    if (this.router.url.includes('/orders/')) {
      setTimeout(() => this.router.navigate([this.exitPath]), 10);
    }
  }

  ngOnInit() {
    this.baseLayoutService.registerNewPageAndSetConfig('/orders/create/type', {
      isSideNavActive: true,
      isCableBackgroundActive: false,
      isBreadcrumbActive: false,
    });
    this.setSteps();
    this.resetStepperOnNavigation();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  setSteps() {
    const stepsSubscription = this.orderWizardService
      .getWizardStepsObservable()
      .subscribe((steps) => {
        this.orderSteps = steps.filter((step) => step.isVisible);
        this.orderSteps = this.orderSteps.slice(
          this.displayStartIndex,
          this.displayEndIndex,
        );
      });

    this.activeStepPath = new BehaviorSubject<string>(window.location.pathname);
    this._subscriptions.push(stepsSubscription);
  }

  goToNextSteps() {
    const allStepsCount = this.orderSteps.length;
    if (this.displayEndIndex < allStepsCount) {
      this.displayStartIndex++;
      this.displayEndIndex++;
      this.setSteps();
    }
  }

  goToPreviousSteps() {
    if (this.displayStartIndex > 0) {
      this.displayStartIndex--;
      this.displayEndIndex--;
      this.setSteps();
    }
  }

  getRouteAnimationData() {
    return (
      this.contexts.getContext('primary')?.route?.snapshot?.data?.[
        'animation'
      ] || { optional: true }
    );
  }

  async navigateToStep(path: string) {
    await this.router.navigate([path]);
  }

  scrollToTop() {
    this.scrollContainer?.nativeElement?.scrollTo(0, 0);
  }

  resetStepperOnNavigation() {
    const subscription = this.router.events
      .pipe(filter((e: any): e is RouterEvent => e instanceof NavigationStart))
      .subscribe((event: RouterEvent) => {
        console.log(event);

        const currentStepIndex = this.orderSteps.findIndex(
          (step) => step.path === event.url,
        );
        if (currentStepIndex >= this.displayEndIndex) {
          this.goToNextSteps();
        } else if (currentStepIndex < this.displayStartIndex) {
          this.goToPreviousSteps();
        }
        if (event.url === '/orders/create/type') {
          this.activeStepPath?.next(event.url);
        }
      });

    this._subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    while (this._subscriptions?.length > 0) {
      this._subscriptions.pop()?.unsubscribe();
    }
  }
}
