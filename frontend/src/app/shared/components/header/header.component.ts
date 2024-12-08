import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
