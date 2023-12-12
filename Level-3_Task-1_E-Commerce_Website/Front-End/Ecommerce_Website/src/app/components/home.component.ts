import { Component, OnInit } from '@angular/core';
import { IFeaturette } from 'src/interfaces/IFeaturette';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="!contentLoaded; else content">
  <main class="d-flex justify-content-center align-items-center">
    <div class="mybackground"></div>
    <div class="spinner-container">
      <div class="spinner-grow text-warning" style="width: 5rem; height: 5rem; position: relative;" role="status">
        <div class="spinner-grow text-warning" style="width: 3rem; height: 3rem;" role="status"></div>
        <div class="spinner-grow text-warning position-absolute" style="width: 3rem; height: 3rem; top: 50%; left: 50%; transform: translate(-50%, -50%);" role="status"></div>
      </div>
      <div class="spinner-text text-warning" [innerText]="'loading...' | titlecase"></div>
    </div>
  </main>
</ng-container>


<ng-template #content>
  <app-navbar class="navbar-fixed-top"></app-navbar>

  <main class="bg-dark">
    <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel" data-interval="3000">
        <div class="carousel-indicators">
            <button *ngFor="let slide of slides; let i = index" type="button" [attr.data-bs-target]="'#myCarousel'"
                [attr.data-bs-slide-to]="i" [class.active]="i === 0" [attr.aria-current]="i === 0"
                [attr.aria-label]="'Slide ' + (i + 1)"></button>
        </div>
        <div class="carousel-inner">
            <div *ngFor="let slide of slides; let i = index" class="carousel-item" [class.active]="i === 0">
                <img [src]="slide.imageUrl" class="carousel-image" [class.dimmed-image]="i === 1 || i ==2" />
                <div class="container">
                    <div class="carousel-caption" [class.text-start]="i === 0" [class.text-end]="i === 2">
                        <h1 [innerText]="slide.title | titlecase"></h1>
                        <p class="opacity-75" [innerHTML]="slide.description"></p>
                        <button type="button" class="btn btn-lg btn-outline-warning" [innerText]="slide.buttonText"></button>
                    </div>
                </div>
            </div>
        </div>
    
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    

    <!-- Special section Start -->

    <!-- <div class="d-flex justify-content-center">
        <div style="width: 70%;">
          <div class="card m-4">
            <img src="https://www.teqfind.com/content/products/103109555_1058809319.jpg?width=1920" class="card-img" alt="Special Offer" />
            <div class="card-img-overlay">
              <div class="card-header text-white bg-dark">
                Week's Special
              </div>
              <div class="card-body text-white">
                <h5 class="card-title">RGB EarBuds from Bang & Olufsen</h5>
                <p class="card-text">This week's special is RGB EarBuds from Bang & Olufsen, and they are available at a low price of R2,799.</p>
                <a href="#" class="btn btn-primary">Grab Them Now</a>
              </div>
              <div class="card-footer text-body-secondary">
                Limited time offer
              </div>
            </div>
          </div>
        </div>
      </div> -->
      

    <!-- Special section Finish -->


    <!-- Sub Profiles Start -->

    <div class="container marketing mt-4">

      <h1 class="text-center text-warning mt-5 mb-4">Promotions</h1>
      
      <div class="card-group">
        <div class="row">
          <div *ngFor="let feature of features" class="col-md-4"> <!-- Use col-md-4 to display 3 items per row on medium-sized screens -->
            <div class="card rounded">
              <img [src]="feature.imageUrl" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title text-warning">{{ feature.price | currency: "R" }}</h5>
                <p class="card-text text-primary">{{ feature.name }}</p>
                <p class="card-text text-warning">{{ feature.description }}</p>
                <button class="btn btn-info" (click)="redirectToFeature(feature)">View details</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="featurette-divider text-warning mt-4">
      

        <!-- Sub Profiles Ends -->


      <h1 class="text-center text-warning mt-5 mb-4">Online Exclusives</h1>
        <!-- START THE FEATURETTES -->
        <ng-container *ngFor="let featurette of featurettes; let i = index">
          
          <div class="row featurette">
              <div [ngClass]="featurette.class1" class="text-white">
                  <h2 class="featurette-heading">{{ featurette.name }}</h2>
                  <p class="lead text-secondary">{{ featurette.description }}</p>
                  <p class="text-warning">
                      Price: {{ featurette.price | currency: 'R' }}
                  </p>
                  <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
                    <button type="button" class="btn btn-outline-primary btn-primary text-white">Add to Cart</button>
                    <button type="button" class="btn btn-outline-primary">View Item</button>
                  </div>
              </div>
              <div [ngClass]="featurette.class2">
                  <img [src]="featurette.imageUrl"
                      class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
                      height="500" alt="{{ featurette.name }}" />
              </div>
          </div>

          <hr class="featurette-divider text-white mb-6">
        </ng-container>
        <!-- /END THE FEATURETTES -->


    </div>


    <app-footer class="my-footer"></app-footer>
</main>

<div>
  <svg id="clouds" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677">
    <title>Gray Clouds Background</title>
    <path id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee"/>
  </svg>
</div>
</ng-template>



  `,
  styles: [
    `@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3&display=swap');

    main{
        font-family: 'Source Sans 3', sans-serif!important;
    }
    
    .navbar-fixed-top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        /* Adjust the z-index value as needed */
    }
    
    
    .carousel-image {
        height: 100vh;
        object-fit: cover;
        /* To maintain image aspect ratio */
        width: 100%;
        /* Ensure full width */
    }
    
    .dimmed-image {
        filter: brightness(0.5);
        /* Adjust the value as needed */
    }
    
    svg#clouds {
        position: fixed;
        bottom: -160px;
        left: -230px;
        z-index: -10;
        width: 1920px;
      }
    
      .mybackground{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -5;
        background-color: rgba(37, 56, 119, 0.74);
      }
    
      /* Center the spinner and text vertically and horizontally */
    .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh; /* Adjust this value for the desired height */
      }
      
      /* Increase the spinner size */
      .spinner-border {
        width: 6rem; /* Adjust this value for the desired size */
        height: 6rem; /* Adjust this value for the desired size */
        margin-bottom: 1rem; /* Space between spinner and text */
      }
      
      /* Style the "Loading..." text */
      .spinner-text {
        font-size: 1.5rem; /* Adjust this value for the desired font size */
        color: #17a2b8; /* Desired text color */
      }
      
    
    
    
      .card {
        background-color: #4d4d4d9f; /* Background color of the cards */
        margin: 10px; /* Add margin between cards */
      }
      
      .card-img-top {
        height: 200px; /* Set the desired height for all images */
        object-fit: cover; /* Maintain aspect ratio of images */
      }
      
      .card-title {
        color: #FFA500; /* Set the title text color to orange */
      }
      
      .card-text {
        color: #007BFF; /* Set the description text color to blue */
      }
      
      .card-text.text-secondary {
        color: #6c757d; /* Set the "Last updated" text color to gray */
      }
      
      .container .card-group .btn {
        background-color: #1757b8; /* Set the button background color to teal */
        color: #fff; /* Set the button text color to white */
        border: none!important;
      }
      
      .container .card-group .btn:hover {
        background-color: #133296; /* Change button background color on hover */
      }
      
      .row img{
        /* border-radius: 12px; */
        background-color: transparent!important;
      }
    
      /* Select the first button in the button group */
    .btn-group > .btn:first-child:hover {
        background-color: #004da0;
        color: yellow;
    }
    
    
    
    
    /* Thin scrollbar */
    ::-webkit-scrollbar {
        width: 1px!important; /* Adjust the width as needed */
      }
      
      /* Track (the area where the scrollbar moves) */
      ::-webkit-scrollbar-track {
        background: #f1f1f1; /* Change the background color */
      }
      
      /* Handle (the draggable part of the scrollbar) */
      ::-webkit-scrollbar-thumb {
        background: #888; /* Change the thumb color */
      }
      
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555; /* Change the thumb color on hover */
      }
      `
  ]
})
export class HomeComponent implements OnInit {

  contentLoaded: boolean = false;
  
  slides: any[] =[]

  features: IFeaturette[] = [
    {
      imageUrl: 'https://i5-images.massmart.co.za/asr/23ca8679-3292-498b-a56a-1c7c5693e9ca.574dc2e3429c6974c934c189d2a89020.jpeg?odnHeight=255&odnWidth=285&odnBg=FFFFFF',
      price: 66179,
      name: 'Dell Precision 5760 17.0-inch FHD+ Laptop - Intel Core i7-11850H 512GB SSD 16GB RAM Win 10 Pro',
      description: 'Hurry, limited stock available!',
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://i5-images.massmart.co.za/asr/f9cbe209-e75b-4ec8-99ec-5ab5443bbb0a.ee418c208939073ea5ef6d523e434249.jpeg?odnHeight=255&odnWidth=285&odnBg=FFFFFF',
      price: 61499,
      name: 'Dell Latitude 9440 14-inch QHD+ 2-in-1 Laptop - Intel Core i7-1365U 512GB SSD 16GB RAM Win 11 Pro',
      description: `Exclusive offer, don't miss out!`,
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://i5-images.massmart.co.za/asr/9ada6293-dfef-4a07-8ffd-30dc26c75830.e629ca80934ad114fd750832be5d2579.jpeg?odnHeight=255&odnWidth=285&odnBg=FFFFFF',
      price: 5499,
      name: 'HP Student Laptop Bundle',
      description: `Last chance to buy, act fast!`,
      link: '#',
      class1: undefined,
      class2: undefined,
    }
    ,
    {
      imageUrl: 'https://media.takealot.com/covers_tsins/58485445/58485445-1-zoom.jpeg',
      price: 699,
      name: 'Tech Geeks Double Din HD Touch Screen Radio/BT/USB/MP5/Reverse Cam Support',
      description: `Popular choice - get yours today!`,
      link: '#',
      class1: undefined,
      class2: undefined,
    },
    {
      imageUrl: 'https://media.takealot.com/covers_tsins/58484436/58484436-1-zoom.jpeg',
      price: 4899,
      name: 'Raspberry Pi 4 Model B - 8GB, Single Board Computer',
      description: `Best deal in town - shop now!`,
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

  featurettes: IFeaturette[] = [
    {
      imageUrl: 'https://www.teqfind.com/content/products/103109555_1058809319.jpg?width=1920',
      name: 'Onikuma K20 Gaming Headset Over-Ear Headphones With Microphone - Black',
      description: `Eligible for next-day delivery or collection.
      Eligible for Cash on Delivery.
      Hassle-Free Exchanges & Returns for 30 Days.
      6-Month Limited Warranty.`,
      price: 1499.99,
      class1: 'col-md-7',
      class2: 'col-md-5',
      link: '#'
    },
    {
      imageUrl: 'https://media.takealot.com/covers_tsins/59381862/59381862-1-zoom.jpeg',
      name: 'Logitech G915 TKL LIGHTSPEED Wireless RGB Mechanical Gaming Keyboard',
      description: `Free Delivery Available.
      Hassle-Free Exchanges & Returns for 30 Days.
      24-Month Limited Warranty.`,
      price: 1999.99,
      class1: 'col-md-7 order-md-2',
      class2: 'col-md-5 order-md-1',
      link: '#'
    },
    {
      imageUrl: 'https://media.takealot.com/covers_images/d57af52d724041fe8ea8772f96cdeefc/s-zoom.file',
      name: 'HP 15s-fq0011ni, 15.6", Intel Celeron N4120, 4GB RAM, 128GB SSD',
      description: `Eligible for next-day delivery or collection.
      Free Delivery Available.
      Hassle-Free Exchanges & Returns for 30 Days.
      12-Month Limited Warranty.`,
      price: 1799.99,
      class1: 'col-md-7',
      class2: 'col-md-5',
      link: '#'
    },
  ];
  

  constructor() {}

  ngOnInit(): void {

    this.slides = [
      {
        imageUrl: 'https://i.pcmag.com/imagery/articles/00866hoEzvwpCVMuTTqXOrp-2..v1634857232.jpg',
        title: 'get the new rasberryPi 5 now!',
        description: 'Some representative placeholder content for the first slide of the carousel.',
        buttonText: 'Buy Now!'
      },
      {
        // imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/5c2aee6945776e85d14956ae/1605745481641-XVYL5UV5VJB6P8SRXT8L/shop-blue-sky-social.png',
        title: 'Why Choose Tech City?',
        description: `Discover top-quality tech products, an impeccable reputation, <br>and a shopping experience like no other. <br>With a diverse range of cutting-edge gadgets and expert guidance, <br>we're committed to making your tech dreams come true. Join the TechStore family and embrace the future today!`,
        buttonText: 'Learn more'
      },      
      {
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipMrmR2z77oVwqymkcgb_9gd3nIWtwl7JxNAjHfR=s1630-k-no',
        title: 'Planning to Swing By Our Store?',
        description: 'Discover our Earthly haven at Awesome Street, Tech City. <br>We can\'t wait to welcome you to our tech wonderland!',
        buttonText: 'Browse gallery'
      }      
    ];

    this.preloadImages()
    .pipe(finalize(() => {
      this.contentLoaded = true;
    }))
    .subscribe();
  }

  preloadImages(): Observable<any> {
    const imageUrls = [
      'https://i.pcmag.com/imagery/articles/00866hoEzvwpCVMuTTqXOrp-2..v1634857232.jpg',
      'https://images.squarespace-cdn.com/content/v1/5c2aee6945776e85d14956ae/1605745481641-XVYL5UV5VJB6P8SRXT8L/shop-blue-sky-social.png',
      'https://lh5.googleusercontent.com/p/AF1QipMrmR2z77oVwqymkcgb_9gd3nIWtwl7JxNAjHfR=s1630-k-no'
    ];
  
    const observables = imageUrls.map((url) => {
      return new Observable<void>((observer) => {
        const img = new Image();
        img.onload = () => {
          observer.next();
          observer.complete();
        };
        img.src = url;
      });
    });
  
    return forkJoin(observables);
  }

    redirectToFeature(feature: any) {
      window.location.href = feature.link;
    }
  
  
}

