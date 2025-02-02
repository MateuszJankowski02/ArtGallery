import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FetchCategoriesService {

  constructor() { }
  // fetch first 10 categories
  async getCategories(page: number = 1): Promise<any> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await axios.get(`${environment.apiUrl}/categories/?page=${page}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      if(response.status === 200){
        console.log('Categories fetched successfully:', response.data);
        console.log('Status:', response.status);
      }

      return response;

    }catch (error: any) {
      if (error.response) {
        console.error('Validation Error:', error.response);
        return error.response;
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }

  }
}
