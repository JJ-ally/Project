import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChartComponent } from './chart/chart.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  { path:'',component:HomeComponent},
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'product',component:ProductComponent},
  { path:'product-detail',component:ProductDetailComponent},
  { path:'about',component:AboutComponent},
  { path:'chart',component:ChartComponent},
  { path:'view-users',component:ViewUsersComponent},
  { path:'edit-product',component:EditProductComponent},
  { path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
