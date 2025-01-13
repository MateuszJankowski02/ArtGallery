import { Component, Output, EventEmitter } from '@angular/core';
import { LoginUserService } from '../../services/login-user/login-user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { UserLogin } from '../../interfaces/userLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-window',
  imports: [ CommonModule, ButtonComponent, ReactiveFormsModule ],
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.scss'
})
export class LoginWindowComponent {
  @Output() showLoginWindow = new EventEmitter<boolean>();

    invalidInputShake: boolean = false;
    backendResponse: Promise<any> | null = null;
    errorMessages: string[] = [];

    constructor(private loginUserService: LoginUserService, private router: Router) {}

    onClickHideLoginWindow(): void {
        this.showLoginWindow.emit(false);
    }

    loginForm = new FormGroup({
      loginUsernameOrEmail: new FormControl('', Validators.required),
      loginPassword: new FormControl('', Validators.required),
    });

    loginUser(): void {
      this.loginForm.markAllAsTouched();

      const newUser: UserLogin = {
        loginUsernameOrEmail: this.loginForm.value.loginUsernameOrEmail ?? '',
        loginPassword: this.loginForm.value.loginPassword ?? ''
      };

      if(!this.loginForm.valid) {
        console.log('Invalid form');
        this.triggerInvalidInputShake();
        return;
      }

      this.loginForm.reset();
      this.backendResponse = this.loginUserService.loginUser(
        newUser.loginUsernameOrEmail,
        newUser.loginPassword
      );

      this.backendResponse.then((response) => {
        console.log(JSON.stringify(response, null, 2));
        if(response.status === 200){
          console.log("Status:", response.status);
          this.errorMessages = [];
          this.router.navigate(['/gallery']);
          return;
        }
        if(response.status === 400){
          console.log("Status:", response.status);
          this.errorMessages = [];
          for (const key in response.data) {
            if (response.data.hasOwnProperty(key)) {
              console.log(`${key}:`, response.data[key]);
              this.errorMessages.push(`${response.data[key]}`);
            }
          }
        }
      }).catch((error) => {
        console.error(JSON.stringify(error.error ?? error, null, 2));
      });

    }

    triggerInvalidInputShake(): void {
      this.invalidInputShake = true;
      setTimeout(() => this.invalidInputShake = false, 300);
    }
}
