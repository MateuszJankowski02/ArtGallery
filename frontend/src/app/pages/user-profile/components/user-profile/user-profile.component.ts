import { Component, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../../../../shared/components/main-header/main-header.component';
import { FetchUserDetailsService } from '../../services/fetch-user-details/fetch-user-details.service';
import { User } from '../../interfaces/User';


@Component({
  selector: 'app-user-profile',
  imports: [MainHeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 0,
    username: '',
    bio: '',
    email: ''
  };

  constructor(private fetchUserDetailsService: FetchUserDetailsService) {}


  ngOnInit(): void {
    this.loadUser();
  }

  async loadUser(): Promise<void> {

    const response = await this.fetchUserDetailsService.getUserDetails();

    if (response.status === 200) {
      console.log('User details fetched successfully');
      console.log('Status:', response.status);
      this.user = await response.data;
    }else if(response.status === 404){
      console.log('Page not found');
    }else {
      console.log('An error occurred while fetching artworks');
      console.log('Status:', response.status);
    }
  }

}
