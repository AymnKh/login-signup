import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loadding: boolean = false;
  errMsg: string = "";
  constructor(private authService:AuthService , private router:Router) { }

  ngOnInit(): void { 
    this.formInit(); // Initialize the form
  }
  formInit() {
    this.loginForm = new FormGroup({ // create a new form group
      'data': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
  }

  login() {
    this.loadding = true; // start loading
    this.errMsg = ""; // reset error message
    const data = this.loginForm.get('data')?.value; // get data from form
    const password = this.loginForm.get('password')?.value; // get password from form
    this.authService.login(data, password).subscribe({
      next: (result) => {
        const token = result.token; // get token from result
        localStorage.setItem('token', token); // store token in local storage
        this.loadding = false; // stop loading
      },
      error: (err) => {
        this.errMsg = err.error.message; // display error message
        this.loadding = false; // stop loading
      },
      complete: () => { 
        this.router.navigate(['/home']); // redirect to home page
       }
    })
  }
}
