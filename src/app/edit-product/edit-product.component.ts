import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  producteditForm:FormGroup;
  loading=false;
  submitted=false;
  public cards:any;
  product:Product
  constructor(private router:Router,private productService:ProductService, public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.cards=params;
    })

    this.producteditForm=new FormGroup({
      productname:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      quantity:new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      image:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required,Validators.minLength(20)])
    });
    this.producteditForm.controls["productname"].setValue(this.cards["productname"]);
    this.producteditForm.controls["price"].setValue(this.cards["price"]);
    this.producteditForm.controls["quantity"].setValue(this.cards["quantity"]);
    this.producteditForm.controls["image"].setValue(this.cards["image"]);
    this.producteditForm.controls["description"].setValue(this.cards["description"]);
  }
  public hasError = (controlName:string,errorName:string) => {
    return this.producteditForm.controls[controlName].hasError(errorName);
  }
  get f() {return this.producteditForm.controls;}

  OnSubmit(){
    this.submitted =true;
    if(this.producteditForm.invalid){
      return;
    }
    this.loading=true;
    var numberValue =Number(this.cards["noofviews"]);
    this.productService.update(this.producteditForm.value,this.cards["id"],numberValue)
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
 
 }
