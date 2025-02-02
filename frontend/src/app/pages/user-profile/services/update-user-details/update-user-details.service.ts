import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserDetailsService {

  constructor() { }

  async updateUserDetails(data: Partial<any>): Promise<AxiosResponse<any>> {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await axios.patch(`${environment.apiUrl}/users/profile/update/${userId}/`, data, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      return response;

    } catch (error: any) {
      if (error.response) {
        console.error('Validation Error:', error.response);
        return error.response;
      } else if (error.request) {
        console.error('No response received:', error.request);
        return error.request;
      } else {
        console.error('Error:', error.message);
        return error.message;
      }
    }
  }
}
