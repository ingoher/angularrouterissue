import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
})
export class TextButtonComponent {
  @Input()
  mode: 'primary' | 'secondary' | 'tertiary' = 'primary';

  @Input()
  label = 'Button';

  @Input()
  activated?: boolean = false;

  @Input()
  iconSrc?: string;

  @Input()
  type: 'submit' | 'reset' | 'button' = 'button';

  @Input()
  disabled = false;

  @Input()
  shallow?: boolean = false;

  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    return [this.mode];
  }

  onButtonClick(event: Event) {
    this.onClick.emit(event);
  }
}
