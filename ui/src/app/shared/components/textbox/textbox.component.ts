import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fxx-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true
    }
  ],
})
export class TextBoxComponent implements ControlValueAccessor {
  id: string = 'todo'; // TODO random generate id for each textfield at run time

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() lightLabel: boolean = false;
  @Input() rows: number = 5;
  @Input() errorDictionary: { [errorName: string]: string } = {};
  @Input() errors: { [errorName: string]: string };

  @ViewChild('textarea' , { static: true }) textareaEl: ElementRef;

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
    this.onChangeFn(this.textareaEl.nativeElement.value);
    this.onTouchedFn();
  }

  writeValue(value: string): void {
    this.textareaEl.nativeElement.value = value;
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
