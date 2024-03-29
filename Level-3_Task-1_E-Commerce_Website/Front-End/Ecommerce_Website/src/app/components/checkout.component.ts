import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-checkout',
  template: `
    <main class="p-3" style="background-color: #e9e9e9b7;">
    <div class="container">
        <main>
          <div class="py-5 text-center">
            <i class="fa-brands fa-square-pied-piper fa-3x px-2"></i>
            <h2 [innerText]="'order confirmation and checkout' | titlecase "></h2>
            <p class="lead">Thank you for choosing Tech City for your online shopping needs! We appreciate your business and look forward to serving you again in the future. Shopping with us is always a smart choice for top-quality tech products and an exceptional experience. See you soon for more tech-savvy adventures!</p>
          </div>
      
          <div class="row g-5 bg-body-secondary p-3 rounded">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-primary">Your cart</span>
                <span class="badge bg-primary rounded-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                <li *ngFor="let item of items" [ngClass]="{'my-azure-background': item.name === 'Promo code'}" class="list-group-item d-flex justify-content-between lh-sm" style="background-color: beige;">
                  <div>
                    <h6 class="my-0" [ngClass]="{'text-success': item.name === 'Promo code'}">{{ item.name }}</h6>
                    <small class="text-body-secondary" [ngClass]="{'my-azure': item.name === 'Promo code'}">{{ item.description }}</small>
                  </div>
                  <span [ngClass]="{'text-success': item.name === 'Promo code'}">{{ item.price | currency: "R" }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between bg-secondary text-white">
                  <span>Total (ZAR)</span>
                  <strong>{{ getTotalPrice() | currency: "R" }}</strong>
                </li>
              </ul>
              
              <form class="card p-2">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Promo code">
                  <button type="submit" class="btn btn-success">Redeem</button>
                </div>
              </form>
            </div>
            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Billing address</h4>
              <form class="needs-validation" novalidate="">
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label for="firstName" class="form-label">First name</label>
                    <input type="text" class="form-control" id="firstName" placeholder="First name" value="" required="">
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
      
                  <div class="col-sm-6">
                    <label for="lastName" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Last name" value="" required="">
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="username" class="form-label">Username</label>
                    <div class="input-group has-validation">
                        <span type="button" class="input-group-text" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Username@Example">@</span>
                        <input type="text" class="form-control" id="username" placeholder="Username" required="">
                        <div class="invalid-feedback">
                            Your username is required.
                        </div>
                    </div>
                    <div class="mt-2"> <!-- Add margin-top to separate small text -->
                        <small class="text-body-secondary">If you have forgotten your username, kindly click on the '@' symbol to retrieve your username.</small>
                    </div>
                </div>
                            
      
                  <div class="col-12">
                    <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com">
                    <div class="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="42 Imaginary Road, PretendVille" required="">
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
      
                  <div class="col-12">
                    <label for="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>
                    <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
                  </div>
      
                  <div class="col-md-4">
                    <label for="province" class="form-label">Province</label>
                    <select class="form-select" name="selectedProvince" id="province" required [(ngModel)]="selectedProvince" (change)="provinceChanged()">
                      <option value="">Choose...</option>
                      <option *ngFor="let province of provinces" [value]="province.name">{{ province.name }}</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid province.
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <label for="suburb" class="form-label">Suburb</label>
                    <select class="form-select" name="selectedSuburb" id="suburb" required [(ngModel)]="selectedSuburb">
                      <option value="">Choose...</option>
                      <option *ngFor="let suburb of availableSuburbs" [value]="suburb">{{ suburb }}</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid suburb.
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="cc-name" class="form-label">Street</label>
                    <input type="text" class="form-control" id="street" placeholder="Awesome Street" required="">
                    <small class="text-body-secondary">Please enter your complete street address, including any landmarks or details that can help us locate your address accurately.</small>
                    <div class="invalid-feedback">
                      Street Name required
                    </div>
                  </div>

                </div>
      
                <hr class="my-4">
      
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="same-address">
                  <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
                </div>
      
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="save-info">
                  <label class="form-check-label" for="save-info">Save this information for next time</label>
                </div>
      
                <hr class="my-4">
      
                <h4 class="mb-3">Payment</h4>
      
                <div class="my-3">
                  <div class="form-check">
                    <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required="">
                    <label class="form-check-label" for="credit">Credit card</label>
                  </div>
                  <div class="form-check">
                    <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required="">
                    <label class="form-check-label" for="debit">Debit card</label>
                  </div>
                </div>
      
                <div class="row gy-3">
                  <div class="col-md-6">
                    <label for="cc-name" class="form-label">Name on card</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="My Awesome Name" required="">
                    <small class="text-body-secondary">Full name as displayed on card</small>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
      
                  <div class="col-md-6">
                    <label for="cc-number" class="form-label">Credit card number</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="0000 0000 0000 0000" required="">
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
      
                  <div class="col-md-3">
                    <label for="cc-expiration" class="form-label">Expiration</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="01/01" required="">
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
      
                  <div class="col-md-3">
                    <label for="cc-cvv" class="form-label">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="777" required="">
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
      
                <hr class="my-4">
      
                <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout <i class="fa-brands fa-shopify"></i> </button>
              </form>
            </div>
          </div>
        </main>
      
        <footer class="my-5 pt-5 text-body-secondary text-center text-small">
          <p class="mb-1">© 2023 Mbuelo Maranda</p>
          <ul class="list-inline">
            <li class="list-inline-item"><a href="#">Privacy</a></li>
            <li class="list-inline-item"><a href="#">Terms</a></li>
            <li class="list-inline-item"><a href="#">Support</a></li>
          </ul>
        </footer>
      </div>
</main>
  `,
  styles: [
    `.custom-popover {
      --bs-popover-max-width: 200px;
      --bs-popover-border-color: var(--bd-violet-bg);
      --bs-popover-header-bg: var(--bd-violet-bg);
      --bs-popover-header-color: var(--bs-white);
      --bs-popover-body-padding-x: 1rem;
      --bs-popover-body-padding-y: .5rem;
    }
  
  .my-azure-background{
    background-color: azure!important;
  }
  
  .my-azure{
    color: rgb(0, 139, 0)!important;
  }`
  ]
})
export class CheckoutComponent {

  selectedProvince: string = "";
  selectedSuburb: string = "";
  availableSuburbs: string[] = [];


  provinces: any[] = [
    {
      name: "Eastern Cape",
      suburbs: ["Port Elizabeth", "East London", "Grahamstown"]
    },
    {
      name: "Free State",
      suburbs: ["Bloemfontein", "Welkom", "Sasolburg"]
    },
    {
      name: "Gauteng",
      suburbs: ["Johannesburg", "Pretoria", "Soweto"]
    },
    {
      name: "Limpopo",
      suburbs: ["Polokwane", "Mokopane", "Thohoyandou", "Tshilamba", "Musina"]
    },
    {
      name: "KwaZulu-Natal",
      suburbs: ["Durban", "Pietermaritzburg", "Newcastle"]
    },
    {
      name: "Mpumalanga",
      suburbs: ["Nelspruit", "Witbank", "Secunda"]
    },
    {
      name: "North West",
      suburbs: ["Rustenburg", "Mafikeng", "Klerksdorp"]
    },
    {
      name: "Northern Cape",
      suburbs: ["Kimberley", "Upington", "Springbok"]
    },
    {
      name: "Western Cape",
      suburbs: ["Cape Town", "Stellenbosch", "George"]
    },
  ];
  
  

  items = [
    {
      name: 'Product name',
      description: 'Brief description',
      price: 12,
    },
    {
      name: 'Second product',
      description: 'Brief description',
      price: 8,
    },
    {
      name: 'Third item',
      description: 'Brief description',
      price: 5,
    },
    {
      name: 'Promo code',
      description: 'EXAMPLECODE',
      price: -5,
    },
  ];


  constructor() {}

  ngOnInit(): void {
    // Initialize the popover for your element
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

  getTotalPrice(): number {
    let amount = 0;
    let promo = 0;
  
    this.items.forEach((item) => {
      if (item) {
        if (item.name !== 'Promo code') {
          amount += item.price;
        } else {
          promo = Math.abs(item.price);
        }
      }
    });
  
    return amount - promo;
  }
  


  provinceChanged() {
    console.log('Selected Province: ', this.selectedProvince);
    const selectedProvinceData = this.provinces.find((p) => p.name === this.selectedProvince);
    if (selectedProvinceData) {
      this.availableSuburbs = selectedProvinceData.suburbs;
    } else {
      this.availableSuburbs = [];
    }
    this.selectedSuburb = ""; // Reset the selected suburb
  }
}
