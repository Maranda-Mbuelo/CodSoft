import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart.component';
import { CheckoutComponent } from './components/checkout.component';
import { HomeComponent } from './components/home.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: "auth", component: AuthComponent},
  // { path: "admin", component: AdminComponent},
  { path: "checkout", component: CheckoutComponent},
  { path: "cart/:userId", component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
