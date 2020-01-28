import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fxx-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true
    }
  ],
})
export class TextfieldComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() errorDictionary: { [errorName: string]: string } = {};
  @Input() errors: { [errorName: string]: string };

  @ViewChild('input' , { static: true }) inputEl: ElementRef;

  onChangeFn: any;
  onTouchedFn: any;

  get errorMsg() {
    if (!this.errors) { return '<br>'; }

    let msgs = [];
    Object.keys(this.errors).forEach(errorName => msgs.push(this.errorDictionary[errorName] || errorName));
    return msgs.join('<br>');
  }

  onChange() {
    this.onChangeFn(this.inputEl.nativeElement.value);
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    this.inputEl.nativeElement.value = value;
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
