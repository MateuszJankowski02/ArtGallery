import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { FetchCategoriesService } from '../../../../shared/services/fetch-categories/fetch-categories.service';
import { UploadArtworkService } from '../../services/upload-artwork/upload-artwork.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-upload-artwork',
  imports: [ReactiveFormsModule, MainHeaderComponent, CommonModule, ButtonComponent],
  templateUrl: './upload-artwork.component.html',
  styleUrl: './upload-artwork.component.scss'
})
export class UploadArtworkComponent implements OnInit {
  addArtworkForm: FormGroup;
  categories: { id: number, name: string}[] = [];
  successMessage: string = '';
  errorMessages: string[] = [];
  backendResponse: Promise<any> | null = null;

  constructor(
    private fetchCategories: FetchCategoriesService,
    private uploadArtwork: UploadArtworkService
  ) {
    this.addArtworkForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      url: new FormControl('', Validators.required),
      category: new FormControl([], Validators.required)
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fetchCategories.getCategories();

      if (response.status === 200) {
        console.log('Categories fetched successfully:', response.data);
        console.log('Status:', response.status);
        response.data.results = response.data.results.slice(0, 10);
        this.categories = response.data.results.map((category: any) => {
          return {
            id: category.id,
            name: category.name,
          };
        });

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

  async onSubmit(): Promise<void> {
    this.errorMessages = [];
    this.successMessage = '';

    if (!this.addArtworkForm.valid) {
      this.errorMessages.push('Please fill in all required fields.');
      return;
    }

    this.backendResponse = this.uploadArtwork.createNewArtwork(
      this.addArtworkForm.value.title,
      this.addArtworkForm.value.description,
      this.addArtworkForm.value.url,
      this.addArtworkForm.value.category
    );

    this.backendResponse.then((response) => {
      if (response?.status === 201) {
        console.log('Artwork uploaded successfully:', response.data);
        this.successMessage = 'Artwork uploaded successfully.';
        this.addArtworkForm.reset();
        this.addArtworkForm.controls['category'].setValue([]);
      } else if (response?.status === 400) {
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            this.errorMessages.push(`${response.data[key]}`);
          }
        }
      } else {
        this.errorMessages.push('An error occurred. Please try again later.');
        console.log('An error occurred while uploading artwork:', response?.status);
      }
    }).catch((error) => {
      console.error(error);
      this.errorMessages.push('An error occurred. Please try again later.');
    });
  }
}
