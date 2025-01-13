import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  constructor(private router: Router) {}

  onClickLogout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('user');
  }
}
