import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userId: any;
  user = {} as User;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.getUserIDFromToken(); // get user id from token
    this.getUser(); // get user data
  }

  getUserIDFromToken() {
    const token = localStorage.getItem('token'); // get token from local storage
    if (token) { // if token exist
      let user = token.split('.')[1] // get the payload of the token
      this.userId = JSON.parse(atob(user)); // decode the payload and parse it to JSON
    }
  }

  getUser() {
    this.authService.getUser(this.userId.userId).subscribe({ // get user data
      next: (result) => {
        this.user = result.user; // assign user data to user variable
      },
      error: (err) => {
        console.log(err); // display error message
      }
    })
  }

  logOut() {
    localStorage.removeItem('token'); // remove token from local storage
    this.router.navigate(['/login']); // navigate to login page
  }

}
