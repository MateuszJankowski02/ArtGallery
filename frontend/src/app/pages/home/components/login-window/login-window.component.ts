import { Component, Output, EventEmitter } from '@angular/core';
import { LoginUserService } from '../../service/login-user/login-user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { UserLogin } from '../../interfaces/userLogin';

@Component({
  selector: 'app-login-window',
  imports: [ CommonModule, ButtonComponent, ReactiveFormsModule ],
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.scss'
})
export class LoginWindowComponent {
  @Output() showLoginWindow = new EventEmitter<boolean>();

    invalidInputShake: boolean = false;

    constructor(private loginUserService: LoginUserService) {}

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
      this.loginUserService.loginUser(
        newUser.loginUsernameOrEmail,
        newUser.loginPassword
      );
    }

    triggerInvalidInputShake(): void {
      this.invalidInputShake = true;
      setTimeout(() => this.invalidInputShake = false, 300);
    }
}
