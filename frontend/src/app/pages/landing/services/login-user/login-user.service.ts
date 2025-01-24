import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor() { }

  async checkIfUserIdExistsInLocalStorage(userId: string | null): Promise<boolean> {
    if(userId) {
      return true;
    } else {
      return false;
    }
  }

  async loginUser(
    loginUsernameOrEmail: string,
    loginPassword: string
  ): Promise<any> {
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username: loginUsernameOrEmail,
        email: loginUsernameOrEmail,
        password: loginPassword
      });

      if(response.status === 200) {
        console.log('User logged in successfully:', response.data);
        console.log('Status:', response.status);
        localStorage.setItem('userId', response.data.user_id);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);
      }
      while(!this.checkIfUserIdExistsInLocalStorage(localStorage.getItem('userId'))) {
        console.log('Waiting for user to be logged in...');
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
