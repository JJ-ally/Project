import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription
  users: User[] = [];
  public searchText = "";
  public cards: any;
  public shares: any;
  viewitem = 0;
  product: Product;
  products: Product[];

  constructor(private router: Router, private productService: ProductService, private auth: AuthService, private userservice: UserService) {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user
    });

  }

  ngOnInit(): void {
    this.myServices();
    this.shares = this.cards;
  }
  myServices() {
    this.productService.getConfig().subscribe
      ((data) =>
        this.cards = data)
  }
  ViewProduct(item) {
    if (!this.auth.IsLogged()) {
      this.router.navigate(['/login'])
    }
    else {
      var numberValue = Number(item.noofviews)
      this.productService.update(item, item.id, numberValue);
      let product: any = {
        queryParams: item
      }
      this.router.navigate(['/product'], product)
    }

  }
  EditProduct(card)
   {
    if (!this.auth.IsLogged()){
      this.router.navigate(['/login'])}
    else {
      let product: any = {
        queryParams: card
      }
      this.router.navigate(['/edit-product'], product)
    }

  }
  DeleteProduct(product: Product): void {
    if (!this.auth.IsLogged()) {
      this.router.navigate(['/login'])
    }
    else {
      var res = confirm('Are u sure u want to delete the product?')
      if (res) {
        this.productService.delete(product.id)
          .subscribe(data => {
            this.myServices();
            this.products = this.products.filter(u => u !== product);
          })
      }

    }
  }
}
