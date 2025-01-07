import { Injectable } from '@angular/core';
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
}
