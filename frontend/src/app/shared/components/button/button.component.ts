import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  title = input<string>('');
  color = input<'button-border-1' |
                'button-border-2'>('button-border-1');
  type = input<string>('');
}
