import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDetailsService {

  constructor() { }

  async getUserDetails(): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await axios.get(`${environment.apiUrl}/users/profile/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      if(response.status === 200){
        console.log('User details fetched successfully');
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
