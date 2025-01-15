import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() categoryId: number = 0;
  @Input() categoryName: string = '';
  @Input() categoryImageURL: string = '';


  constructor(private router: Router) {}

  onClickCategory(categoryId: number, categoryName: string): void {
    console.log('Clicked on category:', categoryName);
    this.router.navigate(['/gallery', categoryId]);
  }
}
