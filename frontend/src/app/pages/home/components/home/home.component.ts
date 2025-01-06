import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { RegisterWindowComponent } from "../register-window/register-window.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderComponent,
    CarouselComponent,
    RegisterWindowComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showRegisterWindow: boolean = false;

  changeRegisterWindowState(state: boolean): void {
    this.showRegisterWindow = state;
  }
}
