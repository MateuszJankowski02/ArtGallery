import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { RegisterWindowComponent } from "../register-window/register-window.component";
import { LoginWindowComponent } from "../login-window/login-window.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderComponent,
    CarouselComponent,
    RegisterWindowComponent,
    LoginWindowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showRegisterWindow: boolean = false;
  showLoginWindow: boolean = false;

  changeRegisterWindowState(state: boolean): void {
    this.showRegisterWindow = state;
    console.log(state);
  }

  changeLoginWindowState(state: boolean): void {
    this.showLoginWindow = state;
    console.log(state);
  }
}

