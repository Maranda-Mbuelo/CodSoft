import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `


<div class="min-h-screen flex flex-col bg-gray-600">
  <!-- Navbar -->
  <div class="w-full h-auto overflow-hidden">
    <app-navbar></app-navbar>  
  </div>

  <!-- Main Content Area -->
  <div class="w-full relative top-auto bg-gray-500">
    <router-outlet></router-outlet>
  </div>
</div>



`,
  styles: [
  ]
})
export class LayoutComponent {

}
