import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-gallery',
  imports: [MainHeaderComponent, CategoriesComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
