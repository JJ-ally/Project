import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser:User;
  public users:any;
  public username:any;
  constructor(private router:Router,private auth:AuthService,private route:ActivatedRoute,private sharedService:SharedService){
    this.auth.currentUser.subscribe(user => this.currentUser =user);
    this.username =this.currentUser;
  }
  ngOnInit(): void {
  }
  AddProduct(){
    if(!this.auth.IsLogged()){
      this.router.navigate(['/login']);
    }
    else
    this.router.navigate(['/product-detail']); 
  }


  ViewChart(){
    if(!this.auth.IsLogged()){
      this.router.navigate(['/login']);
    }
    else
    this.router.navigate(['/chart']);  
  }

  ViewUsersList(){
    if(!this.auth.IsLogged()){
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/view-users']); 
  }
  LogOut(){
    this.auth.logout();
  }
  isLoggedIn(){
    this.auth.IsLogged();
  }
  changeToLogin(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

  