import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateUserService } from '../../services/create-user/create-user.service';
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
  errorMessages: string[] = [];

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
    registerEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$')]),
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
      console.log(JSON.stringify(response, null, 2));
      if(response.status === 201){
        console.log("Status:", response.status);
        this.errorMessages = [];
        return;
      }
      if(response.status === 400){
        console.log("Status:", response.status);
        this.errorMessages = [];
        for (const key in response.data) {
          if (response.data.results.hasOwnProperty(key)) {
            console.log(`${key}:`, response.data[key]);
            if(response.data[key].includes('This field must be unique.')){
              if(key === 'username'){
                this.errorMessages.push(`Username already exists`);
                continue;
              }
              if(key === 'email'){
                this.errorMessages.push(`Email already exists`);
                continue;
              }
              this.errorMessages.push(`Already exists: ${key}`);
            }
            this.errorMessages.push(`${response.data[key]}`);
          }
        }
      }
    }).catch((error) => {
      console.error(JSON.stringify(error.error ?? error, null, 2));
      this.errorMessages = [];
      this.errorMessages.push('An error occurred while trying to register. Please try again later.');
    });
  }

  triggerInvalidInputShake(): void {
    this.invalidInputShake = true;
    setTimeout(() => this.invalidInputShake = false, 300);
  }

}
