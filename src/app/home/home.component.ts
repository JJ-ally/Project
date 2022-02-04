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
  dropdownList:Array<any>;
  selectedItems:Array<any>;
  dropdownSettings:{};
  enableProductName =false;
  enablePrice =false;
  enableQuantity =false;
  marked=false;
  theCheckbox=false;
  checkedItems:Array<any>;

  constructor(private router: Router, private productService: ProductService, private auth: AuthService, private userservice: UserService) {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user
    });

  }

  ngOnInit(): void {
    this.myServices();
    this.shares = this.cards;
    this.dropdownList= [
      { item_id:1, item_text:'ProductName'},
      { item_id:2, item_text:'Price'},
      { item_id:3, item_text:'Quantity'}
    ];
    this.dropdownSettings ={
      singleSelection :false,
      idField:'item_id',
      textFiled:'item_text',
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      itemsShowLimt:2,
      allowSearchFilter:true
    };
    this.enableProductName = true;

  }
  onItemSelect(item:any){
    if(item != null){
      if(item.item_text =="ProductName")
      this.enableProductName =true;
      if(item.item_text =="Price")
      this.enablePrice =true;
      if(item.item_text =="Quantity")
      this.enableQuantity =true;
    }
  }
  onSelectAll(item:any){
    this.enableProductName = true;
    this.enablePrice =true;
    this.enableQuantity =true;
  }
  onItemDeselectAll(item:any): void{
    if(item != null){
      if(item.item_text =="ProductName")
      this.enableProductName =false;
      if(item.item_text =="Price")
      this.enablePrice =false;
      if(item.item_text =="Quantity")
      this.enableQuantity =false;
    }
  }
  onDeSelectAll(item:any){
    this.enableProductName = false;
    this.enablePrice =false;
    this.enableQuantity =false;
  }
  OnCheckBoxChange(item,checkedItems:any){
    if(checkedItems.target.checked){
      this.checkedItems.push(item.id);
    }
    else{
      for(var i =0;i<this.cards.length; i++){
        if(this.checkedItems[i] == item.id){
          this.checkedItems.splice(i,1);
        }
      }
    }
    
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
