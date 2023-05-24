import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="handleClick()">{{ label }}</button>
  `,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() onClick: any;

  handleClick() {
    if (this.onClick) {
        this.onClick();
    }
  }
}
