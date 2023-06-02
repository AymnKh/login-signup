import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;
  imagePerview: string = '';
  errMsg: string = "";
  loadding: boolean = false;
  constructor(private authService: AuthService , private router:Router) { }

  ngOnInit(): void { 
    this.formInit(); // Initialize the form
  }
  formInit() {
    this.signupForm = new FormGroup({
      'firstname' : new FormControl(null, Validators.required),
      'lastname' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, Validators.required),
      'username' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required),
      'repassword' : new FormControl(null, Validators.required),
      'image' : new FormControl(null, Validators.required),
    });
  }

  onSelectPhoto(event: any) {
    const file = event.target.files[0]; // get the selected image
    this.signupForm.patchValue({ image: file }); // update form value
    this.signupForm.get('image')?.updateValueAndValidity(); // update form
    const reader = new FileReader(); // initialize FileReader
    reader.onload = () => {
      this.imagePerview = reader.result as string; // get image preview
    }
    reader.readAsDataURL(file); // convert file to base64 string
  }

  register() {
    const signupFormData = new FormData();  // create a new form data
    Object.keys(this.signupForm.controls).forEach((k => { // loop through the form controls
      signupFormData.append(k, this.signupForm.get(k)?.value);
    }));
    this.loadding = true;
    this.errMsg = "";
    this.authService.register(signupFormData).subscribe({
      next: (result) => {
        const token = result.token;
        localStorage.setItem('token', token); 
        this.loadding = false;
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message; // display error message
        this.loadding = false;
      },
      complete: () => { 
        this.signupForm.reset(); // reset the form
        this.imagePerview = ''; // reset the image preview
        this.router.navigate(['/home']); // navigate to home page
       }

    })
    
    
  }
}
