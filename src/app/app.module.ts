import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ChartComponent } from './chart/chart.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgChartsModule } from 'ng2-charts';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductService } from './services/product.service';
import { ProductGuardGuard } from './services/product-guard.guard';
import { NotificationService } from './services/notification.service';
import { HomeModule } from './home/home.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    ProductDetailComponent,
    AboutComponent,
    ViewUsersComponent,
    ChartComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    Ng2SearchPipeModule,
    NgChartsModule,
    HomeModule,
    NgMultiSelectDropDownModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductService,ProductGuardGuard,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
