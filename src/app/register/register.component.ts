import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router, private authservice: AuthService,
    private userService:UserService,private notificationService:NotificationService) {
    if(this.authservice.currentUserValue){
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstname:new FormControl('',[Validators.required]),
      lastname:new FormControl('',[Validators.required]),
      location:new FormControl('',[Validators.required])
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  get f() { return this.registerForm.controls; }
  

  OnSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe()
      .subscribe(
        data => {
          this.showToasterSuccess();
        },
        (err) => {
          // this.router.navigate(['/home'])
        });
  }
  showToasterSuccess(){
    this.notificationService.showSuccess( "Registered successfully !!","Login")
  }


}
