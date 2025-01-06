import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor() { }

  loginUser(loginUsername: string, loginPassword: string): void {
    console.log(`Logging in user: ${loginUsername}, password: ${loginPassword}`);
  }
}
