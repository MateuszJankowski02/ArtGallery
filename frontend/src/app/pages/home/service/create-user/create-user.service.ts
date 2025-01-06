import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(){}

  createNewUser(registerUsername: string, registerEmail: string, registerPassword: string, registerConfirmPassword: string): void {
    console.log(`Creating new user with username: ${registerUsername}, email: ${registerEmail}, password: ${registerPassword}, and confirmPassword: ${registerConfirmPassword}`);
  }
}
