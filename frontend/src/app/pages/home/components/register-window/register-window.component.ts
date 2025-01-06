import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register-window',
  imports: [ CommonModule ],
  templateUrl: './register-window.component.html',
  styleUrl: './register-window.component.scss'
})
export class RegisterWindowComponent {
  @Output() showRegisterWindow = new EventEmitter<boolean>();

    onClickHideRegisterWindow(): void {
        this.showRegisterWindow.emit(false);
    }

}
