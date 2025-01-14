import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { FetchCategoriesService } from '../../services/fetch-categories/fetch-categories.service';
import { TransliteratePipe } from '../../../../shared/pipes/transliterate.pipe';


@Component({
  selector: 'app-categories',
  imports: [CommonModule, CategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  // Array of categories that are objects with a title and an image URL
  categoryNames: string[] = [];
  categoryURLs: string[] = [

  ];
  categories: { name: string, imageURL: string }[] = [];


  constructor(
    private fetchCategories: FetchCategoriesService,
    private transliteratePipe: TransliteratePipe
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fetchCategories.getCategories();

      if (response.status === 200) {
        console.log('Categories fetched successfully:', response.data);
        console.log('Status:', response.status);
        response.data.results = response.data.results.slice(0, 10);
        this.categories = response.data.results.map((category: any) => {

          return {
            name: category.name,
            //converting any space in category name into a floor, all letters to lowercase and all polish letters to english
            imageURL: '/assets/images/' + this.transliteratePipe.transform(category.name) + '.jpg'
          };
        });
        console.log('Categories:', this.categories);

      } else {
        console.log('An error occurred while fetching categories');
        console.log('Status:', response.status);
      }
    } catch (error: any) {
      console.error(JSON.stringify(error.error ?? error, null, 2));
      this.categories = [];
      console.log('An error occurred while fetching categories');
    }
  }
}
