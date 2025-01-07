import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(){}
  /*
  async createNewUser(
    registerUsername: string,
    registerEmail: string,
    registerPassword: string
  ): Promise<any> {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:8000/api/users/create/', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  */
  async createNewUser(
    registerUsername: string,
    registerEmail: string,
    registerPassword: string
  ): Promise<any> {
    try {

      const response: AxiosResponse = await axios.post('http://localhost:8000/api/users/create/', {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });

      // The request was made and the server responded with a status code
      console.log('User created successfully:', response.data);
      return response.data;

    } catch (error: any) {

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Validation Error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }

    }
  }
}
