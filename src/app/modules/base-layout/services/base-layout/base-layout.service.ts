import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, filter } from 'rxjs';

import { BaseLayoutConfig } from '../../models';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseLayoutService implements OnDestroy {
  public isOnline$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    navigator.onLine,
  );

  private _baseLayoutConfig$ = new BehaviorSubject<BaseLayoutConfig>({
    isSideNavActive: true,
    isCableBackgroundActive: false,
    isBreadcrumbActive: true,
  });

  private _baseLayoutConfigForPages: { [path: string]: BaseLayoutConfig } = {};

  private _subscriptions: Subscription[] = [];

  constructor(private router: Router) {
    this.subscribeToNavigationService();
  }

  registerNewPageAndSetConfig(path: string, config: BaseLayoutConfig) {
    this._baseLayoutConfigForPages[path] = config;
    this._baseLayoutConfig$.next(config);
  }

  subscribeToNavigationService() {
    const subscription = this.router.events
      .pipe(filter((e: any): e is RouterEvent => e instanceof NavigationStart))
      .subscribe((event: RouterEvent) => {
        const config = this.getConfigForPage(event.url);
        if (config) {
          this._baseLayoutConfig$.next(config);
        }
      });
    this._subscriptions.push(subscription);
  }

  getConfigForPage(path: string): BaseLayoutConfig | undefined {
    if (path in this._baseLayoutConfigForPages) {
      return this._baseLayoutConfigForPages[path];
    } else {
      return undefined;
    }
  }

  getBaseLayoutConfig(): BehaviorSubject<BaseLayoutConfig> {
    return this._baseLayoutConfig$;
  }

  ngOnDestroy(): void {
    while (this._subscriptions?.length > 0) {
      this._subscriptions.pop()?.unsubscribe();
    }
  }
}
