import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { NgOptimizedImage, CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing-header',
  imports: [ButtonComponent, NgOptimizedImage, CommonModule],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss'
})
export class LandingHeaderComponent {
    @Output() showRegisterWindow = new EventEmitter<boolean>();
    @Output() showLoginWindow = new EventEmitter<boolean>();

    constructor() {}

    onClickShowRegisterWindow(): void {
        this.showRegisterWindow.emit(true);
    }

    onClickShowLoginWindow(): void {
        this.showLoginWindow.emit(true);
    }
}
