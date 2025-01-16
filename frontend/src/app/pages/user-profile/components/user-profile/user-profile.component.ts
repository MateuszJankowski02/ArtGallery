import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { FetchUserDetailsService } from '../../services/fetch-user-details/fetch-user-details.service';
import { User } from '../../interfaces/User';
import { UpdateUserDetailsService } from '../../services/update-user-details/update-user-details.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-user-profile',
  imports: [MainHeaderComponent, CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: User = {
    username: '',
    bio: '',
    email: ''
  };

  editForm: FormGroup;
  invalidInputShake: boolean = false;
  errorMessages: string[] = [];
  successMessage: string = '';
  backendResponse: Promise<any> | null = null;
  submitted: boolean = false;

  constructor(
    private fetchUserDetailsService: FetchUserDetailsService,
    private updateUserDetailsService: UpdateUserDetailsService
  ) {
    this.editForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser(): Promise<void> {
    const response = await this.fetchUserDetailsService.getUserDetails();

    if (response.status === 200) {
      console.log('User details fetched successfully');
      console.log('Status:', response.status);

      this.user = {
        username: response.data.username,
        bio: response.data.bio,
        email: response.data.email
      };

      this.editForm.setValue({
        username: this.user.username,
        email: this.user.email,
        password: '',
        confirmPassword: ''
      });

    } else if(response.status === 404){
      console.log('Page not found');
    } else {
      console.log('An error occurred while fetching user details');
      console.log('Status:', response.status);
    }
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.editForm.markAllAsTouched();
    this.errorMessages = [];
    this.successMessage = '';

    if (!this.editForm.valid) {
      this.triggerInvalidInputShake();
      return;
    }

    const formValues = this.editForm.value;
    const updatedFields: any = {};

    // Check which fields have been modified
    if (formValues.username !== this.user.username) {
      updatedFields.username = formValues.username;
    }
    if (formValues.email !== this.user.email) {
      updatedFields.email = formValues.email;
    }
    if (formValues.password) { // If password is provided
      updatedFields.password = formValues.password;
      updatedFields.current_password = formValues.currentPassword;
    }

    if (Object.keys(updatedFields).length === 0) {
      this.errorMessages.push('No changes detected.');
      return;
    }

    this.backendResponse = this.updateUserDetailsService.updateUserDetails(updatedFields);

    this.backendResponse.then((response) => {
      if (response.status === 200) {
        console.log('Status:', response.status);
        this.successMessage = 'User details updated successfully.';
        this.loadUser();
        this.submitted = false;
        return;
      }
      if (response.status === 400) {
        console.log('Status:', response.status);
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            console.log(`${key}:`, response.data[key]);
            this.errorMessages.push(`${response.data[key]}`);
          }
        }
      }
    }).catch((error) => {
      console.error(JSON.stringify(error.error ?? error, null, 2));
      this.errorMessages = [];
      this.errorMessages.push('An error occurred while trying to log in. Please try again later.');
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    // Only require matching if password is provided
    if (password || confirm) {
      return password === confirm ? null : { notMatching: true };
    }
    return null;
  }

  triggerInvalidInputShake(): void {
    this.invalidInputShake = true;
    setTimeout(() => this.invalidInputShake = false, 300);
  }

}
