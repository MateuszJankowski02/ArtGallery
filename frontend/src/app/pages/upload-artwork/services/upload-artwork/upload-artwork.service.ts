import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UploadArtworkService {

  constructor() { }

  async createNewArtwork(
    artworkTitle: string,
    artworkDescription: string,
    artworkUrl: string,
    artworkCategory: number
  ): Promise<any> {
    try {

      const token = localStorage.getItem('token');

      const response: AxiosResponse = await axios.post(
        `${environment.apiUrl}/artworks/create/`,
        {
          title: artworkTitle,
          description: artworkDescription,
          url: artworkUrl,
          category: artworkCategory
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      if(response.status === 201){
        console.log('Artwork created successfully:', response.data);
        console.log('Status:', response.status);
      }
      return response;

    } catch (error: any) {

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
