import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-gallery',
  imports: [MainHeaderComponent, CategoryComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  
}
