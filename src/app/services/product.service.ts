import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Product } from '../models/product';

const httpOptions = {
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  productUrl='http://localhost:3000/cards';

  getConfig(){
    return this.http.get<any[]>(this.productUrl)
  }
  postConfig(product:Product){
    const body = JSON.stringify(product);
    return this.http.post(this.productUrl,body,httpOptions)
  }
  update(product:Product,id:any,views:any){
    product.id =id;
    product.noofviews =Number(product.noofviews)
    views =views + 1;
    product.noofviews =Number(views);
    return this.http.put(this.productUrl + '/'+ product.id,product)
  }
  delete(id:any){
    return this.http.delete<Product[]>(this.productUrl + '/'+ id)
  }
  updatenoofviews(product:Product,id:any){
    product.id =id;
    return this.http.put(this.productUrl + '/'+ id,product)
  }
}
