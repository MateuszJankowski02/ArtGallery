import { LandingHeaderComponent } from './../../../../shared/components/landing-header/landing-header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { RegisterWindowComponent } from "../register-window/register-window.component";
import { LoginWindowComponent } from "../login-window/login-window.component";

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    LandingHeaderComponent,
    CarouselComponent,
    RegisterWindowComponent,
    LoginWindowComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  showRegisterWindow: boolean = false;
  showLoginWindow: boolean = false;

  changeRegisterWindowState(state: boolean): void {
    this.showRegisterWindow = state;
  }

  changeLoginWindowState(state: boolean): void {
    this.showLoginWindow = state;
  }
}

