import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="px-3 py-2 text-bg-dark border-bottom border-secondary">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <i class="fa-brands fa-square-pied-piper fa-2x px-2"></i>
          <h1>Tech City</h1>
        </a>
  
        <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
          <li *ngFor="let item of menuItems">
            <a [href]="item.link" class="nav-link" [ngClass]="item.class">
              <i [ngClass]="'fa ' + item.icon"></i>
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="px-3 py-2 mb-3 my-background">
    <div class="container d-flex flex-wrap justify-content-center">
      <form class="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
        <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
      </form>
      <div class="text-end">
        <button type="button" id="liveToastBtn" class="btn btn-light text-dark me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  menuItems = [
    { icon: 'fa-home', text: 'Home', class: 'text-secondary', link: 'home' },
    // { icon: 'fa-tachometer', text: 'Dashboard', class: 'text-white' },
    { icon: 'fa-brands fa-shopify', text: 'Products', class: 'text-white', link: 'products' },
    { icon: 'fa-shopping-cart', text: 'Cart', class: 'text-white', link: 'cart' },
    { icon: 'fa-tachometer', text: 'Checkout', class: 'text-white', link: 'checkout' }
  ];

  constructor() {}

  ngOnInit(): void {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');

    if (toastTrigger && toastLiveExample) {
      const toastBootstrap = new bootstrap.Toast(toastLiveExample);
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show();
      });
    }
  }
}