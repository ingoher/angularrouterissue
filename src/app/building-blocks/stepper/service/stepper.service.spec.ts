import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationService } from 'src/app/services';

import { StepperService } from './stepper.service';

describe('StepperService', () => {
  let service: StepperService;

  const mockForm = new FormGroup({
    test: new FormControl('test'),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('next', () => {
    it('should emit an onNext event', () => {
      const onNextSpy = jasmine.createSpyObj('Subject', ['next']);
      service.onNext = onNextSpy;

      service.next(mockForm);

      expect(onNextSpy.next).toHaveBeenCalled();
      expect(service.formData?.value).toBeTruthy();
    });
  });

  describe('previous', () => {
    it('should emit an onPrevious event', () => {
      const onPreviousSpy = jasmine.createSpyObj('Subject', ['next']);
      service.onPrevious = onPreviousSpy;

      service.previous(mockForm);

      expect(onPreviousSpy.next).toHaveBeenCalled();
      expect(service.formData?.value).toBeTruthy();
    });
  });

  describe('cancel', () => {
    it('should reset the given form and call navigateTo of Navigation Service', () => {
      const navigationService = TestBed.inject(NavigationService);
      spyOn(navigationService, 'navigateTo');

      service.cancel('');
      expect(navigationService.navigateTo).toHaveBeenCalled();
    });
  });
});
