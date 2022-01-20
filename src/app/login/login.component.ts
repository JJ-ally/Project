import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loggedin = false;
  returnUrl = false;
  objuser: [];
  constructor(private router: Router, private authservice: AuthService,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  get f() { return this.loginForm.controls; }
  get power() { return this.loginForm.get('power'); }

  OnSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.login()
      .pipe(first())
      .subscribe(
        data => {
          this.objuser = data;
          let i = 0;
          for (let i = 0; i < this.objuser.length; i++) {       
            if (this.objuser[i]["email"] == this.f["email"].value) {
              if (this.objuser[i]["password"] == this.f["password"].value) {
                this.loginForm.controls["email"].setValue(this.objuser[i]["email"]);
                this.loggedin = true;
                this.router.navigate(['/home']);
                this.showToasterSuccess();
              }
            }
          }
          if (this.loggedin == false) {
            if (this.objuser[i]["email"] == this.f["email"].value) {    
              this.authservice.logout();
            }
            else{
              this.showToasterError();
            }
    
            if (this.objuser[i]["password"] == this.f["password"].value) {
              this.authservice.logout();
            }
            else{
              this.showToasterError();
            }
          }
        },
        (err) => {
          this.showToasterError();
        });
  }
  showToasterSuccess(){
    this.notificationService.showSuccess( "Login successfully !!","Login")
  }
  showToasterError(){
    this.notificationService.showError( "Username Or Password Incorrect !!","Login")
  }
}
