import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product.component';
import { ProductsComponent } from './components/products.component';
import { SidebarComponent } from './components/sidebar.component';
import { SingleProductComponent } from './components/single-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    SingleProductComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
