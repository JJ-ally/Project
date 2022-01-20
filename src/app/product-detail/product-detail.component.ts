import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm:FormGroup;
  loading=false;
  submitted=false;
  constructor(private router:Router,private productService:ProductService,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.productForm=new FormGroup({
      productname:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      quantity:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      image:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required,Validators.minLength(20)])
    });
  }
  public hasError = (controlName:string,errorName:string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }
  get f() {return this.productForm.controls;}

  OnSubmit(){
    this.submitted =true;
    if(this.productForm.invalid){
      return;
    }
    this.loading=true;
    this.productService.postConfig(this.productForm.value)
    .pipe()
    .subscribe(
      data => {
        this.router.navigate(['/home'])
      },
      (err)=> 
      {
       // this.router.navigate(['/home'])
      });
  }
  showToasterSuccess(){
    this.notificationService.showSuccess( "New Product Added successfully !!","Product")
  }

}
