import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(){}
  
  async createNewUser(
    registerUsername: string,
    registerEmail: string,
    registerPassword: string
  ): Promise<any> {
    try {

      const response: AxiosResponse = await axios.post(`${environment.apiUrl}/users/create/`, {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });

      // The request was made and the server responded with a status code
      if(response.status === 201){
        console.log('User created successfully:', response.data);
        console.log('Status:', response.status);
      }
      return response;

    } catch (error: any) {

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Validation Error:', error.response);
        return error.response;
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
