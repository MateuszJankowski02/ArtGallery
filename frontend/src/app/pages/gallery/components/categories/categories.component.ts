import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../category/category.component';
import { FetchCategoriesService } from '../../services/fetch-categories/fetch-categories.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryNames: string[] = [];

  constructor(private fetchCategories: FetchCategoriesService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.fetchCategories.getCategories();

    response.then((response: any) => {

      if(response.status === 200){
        console.log('Categories fetched successfully:', response.data);
        console.log('Status:', response.status);
        this.categoryNames = response.data.map((category: any) => category.name);
      }else{
        console.log('An error occurred while fetching categories');
        console.log('Status:', response.status);
      }

    }).catch((error: any) => {

      console.error(JSON.stringify(error.error ?? error, null, 2));
      this.categoryNames = [];
      console.log('An error occurred while fetching categories');

    });

  }
}
