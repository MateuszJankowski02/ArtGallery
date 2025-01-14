import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() categoryTitle: string = '';
  @Input() categoryImageURL: string = '';

  constructor() {}

  onClickCategory(category: string): void {
    console.log('Clicked on category:', category);
  }
}
