import { Injectable } from '@angular/core';
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

      const response = await axios.patch(`http://localhost:8000/api/users/profile/update/${userId}/`, data, {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      return response;

    } catch (error: any) {
      throw error;
    }
  }
}
