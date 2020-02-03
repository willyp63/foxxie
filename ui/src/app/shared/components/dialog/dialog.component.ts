import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fxx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmText: string = 'Confirm';

  @Output() cancel: EventEmitter<null> = new EventEmitter<null>();
  @Output() confirm: EventEmitter<null> = new EventEmitter<null>();
}
