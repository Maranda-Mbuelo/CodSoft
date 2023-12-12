import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products.component';
import { SingleProductComponent } from './components/single-product.component';


// Import your components that will be associated with the routes

// Import other components as needed

const productsRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: SingleProductComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
