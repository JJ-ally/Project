import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  PForm:FormGroup;
  public cards:any;
  product:Product;
  products:Product[];
  constructor(private router:Router,public route:ActivatedRoute,public productService:ProductService) { }

  ngOnInit(): void {
  this.route.queryParams.subscribe(params =>{
    console.log(params);
    this.cards = params;
    console.log(this.cards);
  })

  }

}
