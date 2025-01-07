import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateUserService } from '../../service/create-user/create-user.service';
import { UserRegister } from '../../interfaces/userRegister';
import { ButtonComponent } from '../../../../shared/components/button/button.component';


@Component({
  selector: 'app-register-window',
  imports: [ CommonModule, ButtonComponent, ReactiveFormsModule ],
  templateUrl: './register-window.component.html',
  styleUrl: './register-window.component.scss'
})
export class RegisterWindowComponent {

  @Output() showRegisterWindow = new EventEmitter<boolean>();

  invalidInputShake: boolean = false;
  backendResponse: Promise<any> | null = null;

  constructor(private createUserService: CreateUserService) {}

  onClickHideRegisterWindow(): void {
      this.showRegisterWindow.emit(false);
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('registerPassword')?.value;
    const confirm = group.get('registerConfirmPassword')?.value;

    if(password !== confirm) {
      group.get('registerConfirmPassword')?.setErrors({ notMatching: true });
      return { notMatching: true };
    }else{
      return null;
    }
  }

  registerForm = new FormGroup({
    registerUsername: new FormControl('', Validators.required),
    registerEmail: new FormControl('', [Validators.required, Validators.email]),
    registerPassword: new FormControl('', Validators.required),
    registerConfirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  registerUser(): void {
    this.registerForm.markAllAsTouched();



    const newUser: UserRegister = {
      registerUsername: this.registerForm.value.registerUsername ?? '',
      registerEmail: this.registerForm.value.registerEmail ?? '',
      registerPassword: this.registerForm.value.registerPassword ?? '',
      registerConfirmPassword: this.registerForm.value.registerConfirmPassword ?? ''
    };

    if(!this.registerForm.valid) {
      console.log('Invalid form');
      this.triggerInvalidInputShake();
      return;
    }

    this.registerForm.reset();

    this.backendResponse = this.createUserService.createNewUser(
      newUser.registerUsername,
      newUser.registerEmail,
      newUser.registerPassword
    );


    this.backendResponse.then((response) => {
      console.log('User created successfully');
      console.log(JSON.stringify(response, null, 2));
    }).catch((error) => {
      console.log('Error creating user');
      console.error(JSON.stringify(error.error ?? error, null, 2));
    });
  }

  triggerInvalidInputShake(): void {
    this.invalidInputShake = true;
    setTimeout(() => this.invalidInputShake = false, 300);
  }

}
