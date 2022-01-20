import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../models/user';

const httpOptions = {
  headers:new HttpHeaders({'Content-Type':'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userUrl='http://localhost:3000/users';

  getAll(){
    return this.http.get<User[]>(this.userUrl)
  }
  getUsers(){
    return this.http.get(this.userUrl)
  }
  getById(id:number){
    return this.http.get(this.userUrl + id)
  }
  register(user:User){
    const body = JSON.stringify(user);
    return this.http.post(this.userUrl,user,httpOptions)
  }
  update(user:User){
    return this.http.put(this.userUrl + user.id,user)
  }
  delete(id:number){
    return this.http.delete(this.userUrl + id)
  }
}
