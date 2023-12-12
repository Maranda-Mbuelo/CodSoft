import { Component, OnInit } from '@angular/core';
import { IFeaturette } from 'src/interfaces/IFeaturette';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  template: `
    <ng-container *ngIf="!isProductFound, else page">

<main class="bg-body-tertiary d-flex justify-content-center align-items-center min-vh-100">
    <div class="product-not-found">
      <div class="cloud"></div>
      <div class="message">Ooops! The product you're looking for is not found.</div>
    </div>
  </main>
  
</ng-container>

<ng-template #page>
<main *ngIf="singleItem" class="bg-body-tertiary d-flex justify-content-center align-items-center min-vh-100">
    <div class="container featurette py-5">
        <div class="row align-items-center">
            <!-- Card for Product Image (Visible on Mobile) -->
            <div class="col-md-6 d-md-none mb-3">
                <div class="card p-3">
                    <img [src]="singleItem.imageUrl"
                        class="card-img-top" alt="Product Image" />
                </div>
            </div>

            <!-- Product Information -->
            <div class="col-md-6 text-dark">
                <h2 class="featurette-heading" [innerText]="singleItem.name"></h2>
                <p class="lead" [innerText]="singleItem.description"></p>
                <p class="text-warning" *ngIf="singleItem.price !== undefined">
                    Price: {{ singleItem.price | currency: 'R' }}
                </p>
                <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
                    <button type="button" class="btn btn-outline-primary btn-primary text-white" (click)="goBack()">Go Back</button>
                    <button type="button" class="btn btn-outline-primary">Cart  <i class="fa-brands fa-shopify"></i>+</button>
                </div>
            </div>

            <!-- Card for Product Image (Hidden on Mobile) -->
            <div class="col-md-6 d-none d-md-block">
                <div class="card p-3">
                    <img [src]="singleItem.imageUrl"
                        class="card-img-top" alt="Product Image" />
                </div>
            </div>
        </div>
    </div>
</main>
</ng-template>
<footer class="bg-body-tertiary text-body-secondary text-center text-small">
<p class="mb-1">© 2023 Mbuelo Maranda</p>
<ul class="list-inline">
  <li class="list-inline-item"><a href="#">Privacy</a></li>
  <li class="list-inline-item"><a href="#">Terms</a></li>
  <li class="list-inline-item"><a href="#">Support</a></li>
</ul>
</footer>

  `,
  styles: [
    `main{
      width: 100%;
      height: 100vh;
  }
  
  
  /* Styles for the product not found message container */
  .product-not-found {
      text-align: center;
      padding: 20px;
      background-color: #f0f0f0; /* Background color */
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Box shadow for a card-like effect */
      position: relative;
      z-index: 1;
    }
    
    /* Styles for the cloud-like bubble effect */
    .cloud {
      width: 80px;
      height: 80px;
      background: #f0f0f0; /* Background color of the cloud */
      border-radius: 50%;
      position: absolute;
      top: -40px; /* Adjust the positioning to place the cloud above the message */
      left: calc(50% - 40px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Box shadow for the cloud */
    }
    
    /* Styles for the message text */
    .message {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      color: #333; /* Text color */
    }
    `
  ]
})
export class SingleProductComponent implements OnInit {
  singleItem!: any;
  isProductFound: boolean = false;

  features: IFeaturette[] = [
    {
      imageUrl: 'https://i5-images.massmart.co.za/asr/23ca8679-3292-498b-a56a-1c7c5693e9ca.574dc2e3429c6974c934c189d2a89020.jpeg?odnHeight=255&odnWidth=285&odnBg=FFFFFF',
      price: 66179,
      name: 'Dell Precision 5760 Laptop',
      description: 'Intel Core i7-11850H 512GB SSD 16GB RAM Win 10 Pro!',
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://i5-images.massmart.co.za/asr/f9cbe209-e75b-4ec8-99ec-5ab5443bbb0a.ee418c208939073ea5ef6d523e434249.jpeg?odnHeight=255&odnWidth=285&odnBg=FFFFFF',
      price: 61499,
      name: 'Dell Latitude 9440 Laptop',
      description: `Intel Core i7-1365U 512GB SSD 16GB RAM Win 11 Pro`,
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://i5-images.massmart.co.za/asr/9ada6293-dfef-4a07-8ffd-30dc26c75830.e629ca80934ad114fd750832be5d2579.jpeg?odnHeight=255&odnWidth=285&odnBg=FFFFFF',
      price: 5499,
      name: 'HP Student Laptop Bundle',
      description: `Intel Core i3-1165U 512GB SSD 6GB RAM Win 10 Pro`,
      link: '#',
      class1: undefined,
      class2: undefined,
    }
    ,
    {
      imageUrl: 'https://media.takealot.com/covers_tsins/58485445/58485445-1-zoom.jpeg',
      price: 699,
      name: 'Tech Geeks Double Din HD Touch Screen',
      description: `Radio/BT/USB/MP5/Reverse Cam Support`,
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://media.takealot.com/covers_tsins/58484436/58484436-1-zoom.jpeg',
      price: 4899,
      name: 'Raspberry Pi 4',
      description: `Model B - 8GB, Single Board Computer`,
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://media.takealot.com/covers_images/777ea03fccf446a298bdf7e13637c4db/s-zoom.file',
      price: 2199,
      name: 'Vision Ergonomic Gaming Chair',
      description: `Lowest price guaranteed - shop before it's gone!`,
      link: '#',
      class1: undefined,
      class2: undefined,
    }
  ];

  constructor(private route: ActivatedRoute, private location: Location){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      console.log(productId);

      if (productId !== null) {
        const formattedProductId = productId.replace(/-/g, ' '); // Replace hyphens with spaces
        const foundItem = this.features.find((item) => item.name.toLowerCase() === formattedProductId);
      
        if (foundItem) {
          this.singleItem = foundItem;
          this.isProductFound = true;
        } else {
          console.error(`Product with ID ${productId} not found`);
        }
      
        console.log(this.singleItem);
      } else {
        console.error(`Product ID not provided in the route.`);
      }
      
    });      
      
  }

  goBack(): void{
    this.location.back();
  }
}

