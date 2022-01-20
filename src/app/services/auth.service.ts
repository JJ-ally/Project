import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

const httpOptions = {
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http:HttpClient) {
    this.currentUserSubject =new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser=this.currentUserSubject.asObservable();
   }
  userUrl='http://localhost:3000/users';
  public get currentUserValue():User {
    return this.currentUserSubject.value;
  }

  login(){
    return this.http.get<any>(this.userUrl)
    .pipe(map(user =>{
      if(user){
        localStorage.setItem('currentUser',JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }))
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
  IsLogged(){
    if(localStorage.getItem('currentUser')){
      return true;
    }
    else
      return false;
  }
}
