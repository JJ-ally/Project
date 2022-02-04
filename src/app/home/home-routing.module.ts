import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const custRoutes: Routes = [{
  path:'home',
  children:[{
    path:'',component:HomeComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(custRoutes)],
  exports:[RouterModule]
})
export class HomeRoutingModule { }
