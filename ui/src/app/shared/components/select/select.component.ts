import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fxx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() lightLabel: boolean = false;
  @Input() placeholder: string = '';
  @Input() options: string[];
  @Input() errorDictionary: { [errorName: string]: string } = {};
  @Input() errors: { [errorName: string]: string };

  @ViewChild('select' , { static: true }) selectEl: ElementRef;

  value: string;

  onChangeFn: any;
  onTouchedFn: any;

  get errorMsg() {
    if (!this.errors) { return '<br>'; }

    let msgs = [];
    Object.keys(this.errors).forEach(errorName => msgs.push(this.errorDictionary[errorName] || errorName));
    return msgs.join('<br>');
  }

  get textColorClass() { return this.lightLabel ? 'text-white' : 'text-black'; }

  onChange() {
    this.value = this.selectEl.nativeElement.value;

    this.onChangeFn(this.value);
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // TODO
  }
}
