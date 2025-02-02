import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FetchArtworksService {

  constructor() { }

  async getArtworks(page: number = 1): Promise<any> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const endpoint = `${environment.apiUrl}/artworks/basic/?page=${page}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

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

  async getArtworksByUser(page: number = 1): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const endpoint = `${environment.apiUrl}/artworks/basic/user/${userId}/?page=${page}`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

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

  async getArtworksByCategory(page: number = 1, categoryId: number): Promise<any> {

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const endpoint = `${environment.apiUrl}/artworks/basic/category/${categoryId}/?page=${page}`

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

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

  async deleteArtwork(artworkId: number): Promise<any> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const endpoint = `${environment.apiUrl}/artworks/delete/${artworkId}/`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

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
