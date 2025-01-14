import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() categoryName: string = '';
  @Input() categoryImageURL: string = '';

  constructor() {}

  onClickCategory(category: string): void {
    console.log('Clicked on category:', category);
  }
}
