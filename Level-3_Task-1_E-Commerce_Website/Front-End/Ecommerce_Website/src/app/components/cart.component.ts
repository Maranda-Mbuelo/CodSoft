import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IProduct } from 'src/interfaces/IProduct';
import { CartService } from 'src/services/cart.service';
import { ProductsService } from 'src/services/products.service';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-cart',
  template: `
    <main style="background-color: #e9e9e9c0;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" style="background-color: #dad9d9;">
            <div class="card-body p-4">
  
              <div class="row">
  
                <div class="col-lg-7">
                    <h5 class="mb-3 cursor-pointer">
                        <a class="text-body cursor-pointer" (click)="goBack()">
                            <i class="fas fa-long-arrow-alt-left me-2"></i>
                            Continue shopping
                        </a>
                    </h5>
                    
                  <hr>
  
                  <div *ngIf="items.length > 0; else emptyCart">
                    <!-- Show items when there are items in the cart -->
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p class="mb-1">Shopping cart</p>
                        <p class="mb-0">You have {{itemsNumber}} items in your cart</p>
                      </div>
                      <div>
                        <p class="mb-0">
                          <span class="text-muted">Sort by:</span>
                          <a href="#!" class="text-body">
                            price <i class="fas fa-angle-down mt-1"></i>
                          </a>
                        </p>
                      </div>
                    </div>
  
                    <ng-container *ngFor="let product of items">
                      <div class="card mb-3" style="background-color: #c2c2c2c0;">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  [src]="product.imageURL"
                                  class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                              </div>
                              <div class="ms-3">
                                <h5 [innerText]="product.productName"></h5>
                                <p class="small mb-0" [innerText]="product.description"></p>
                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 50px;">
                                <h5 class="fw-normal mb-0 p-1" [innerText]="getProductQuantity(product.productName)"></h5>
                              </div>
                              <div style="width: 110px;">
                                <h5 class="mb-0" [innerText]="product.price | currency : 'R'"></h5>
                              </div>
                              <a (click)="deleteCart(product.productID)"  style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ng-container>
                  </div>
  
                  <!-- Empty cart message template -->
                  <ng-template #emptyCart>
                    <div class="text-center">
                      <p>Your cart is empty.</p>
                      <p>Continue shopping to add items to your cart.</p>
                    </div>
                  </ng-template>
  
                </div>
                <div class="col-lg-5">
  
                  <div class="card bg-secondary text-white rounded-3">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="mb-0">
                          Order Summary
                          <br>
                          <p class="small mb-2 text-dark">Mbuelo</p>
                        </h5>
                        <img src="https://res.cloudinary.com/ddigkgb9y/image/upload/v1695563872/k08z5x7rjjswcajh3ssd.jpg"
                          class="img-fluid rounded-3" style="width: 45px;" alt="Avatar">
                      </div>
  
                      <p class="small mb-2">You can proceed with any of these</p>
                      <a href="#!" type="submit" class="text-white"><i
                          class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                      <a href="#!" type="submit" class="text-white"><i
                          class="fab fa-cc-visa fa-2x me-2"></i></a>
                      <a href="#!" type="submit" class="text-white"><i
                          class="fab fa-cc-amex fa-2x me-2"></i></a>
                      <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>
  
                      <form class="mt-4">
                        <div class="form-outline form-white mb-4">
                            <input type="text" id="promoCode" class="form-control form-control-m text-dark" size="17" placeholder="Promo Code" style="background-color: #fff;" />
                            <label class="form-label text-white" for="promoCode">Promo Code</label>
                        </div>
                    
                        <div class="form-outline form-white mb-4">
                          <select class="form-select form-select-lg text-dark" id="shippingMethod" 
                                  aria-label="Choose Shipping Method"
                                  formControlName="selectedShippingMethod" (change)="onShippingMethodChange($event)">
                            <option value="standard">Standard Shipping</option>
                            <option value="express">Express Shipping</option>
                          </select>
                        </div>
                      
                        <div class="d-flex justify-content-between text-white">
                          <p>Items in Cart</p>
                          <p [innerHTML]="getItemsNumber()"></p>
                        </div>
                      
                        <div class="d-flex justify-content-between mb-4 text-white">
                          <p>Shipping Charge</p>
                          <p>{{ getShippingCharge() | currency: 'R' }}</p>
                        </div>
                    </form>
                    
                    
  
                      <hr class="my-4">
  
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">Subtotal</p>
                        <p class="mb-2">{{getSubTotal() | currency: 'R'}}</p>
                      </div>
  
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">Shipping</p>
                        <p class="mb-2">+ {{ getShippingCharge() | currency: 'R'}}</p>
                      </div>
  
                      <div class="d-flex justify-content-between mb-4">
                        <p class="mb-2">Total(Incl. taxes)</p>
                        <p class="mb-2">{{getTotal() | currency: 'R'}}</p>
                      </div>
  
                      <button type="button" class="btn btn-success btn-block btn-lg">
                        <div class="d-flex justify-content-between">
                          <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                      </button>
  
                    </div>
                  </div>
  
                </div>
  
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
</main>
  `,
  styles: [
  ]
})
export class CartComponent implements OnInit {

  itemsSubject: Subject<Array<IProduct>> = new Subject<Array<IProduct>>();
  itemsSubscription: Subscription = new Subscription();
  productQuantities: Record<string, number> = {};
  items: Array<IProduct> = [];
  itemsNumber: number = 0;
  userId: string = '';
  selectedShippingMethod: string = 'standard';

  constructor(
    private location: Location, 
    private router: ActivatedRoute,
    private cartService: CartService, 
    private userService: UserService,
    private productService: ProductsService,
    ){}

  ngOnInit(): void {
    // this.getCartOwnerName(this.userId);
    this.getUserId();
    this.getCartItemsById(this.userId);
    // Subscribe to items$
    this.itemsSubscription = this.cartService.items$.subscribe(
      (newItems) => {
        // Handle the updated items array as needed
        console.log('Updated items:', newItems);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.itemsSubscription.unsubscribe();
  }

  getUserId(): void{
    this.router.paramMap.subscribe(
      params => {
        const id = params.get('userId');
        if(id){
          this.userId = id;
        }
      }
    )
  } 


  // Cart Code

  getCartItemsById(id: string): void {
    this.cartService.getAllCart().subscribe(
      (response) => {
        const cartItems: Array<IProduct> = [];
        const productQuantities: Record<string, number> = {};
  
        response.forEach((cart) => {
          if (cart.ownerUserID === id) {
            this.productService.getAllProducts().subscribe(
              (product) => {
                product.forEach((product) => {
                  if (cart.productID === product.productID) {
                    const productName = product.productName;
                    if (!productQuantities[productName]) {
                      productQuantities[productName] = 0;
                    }
                    productQuantities[productName]++;
                    if (!cartItems.find(item => item.productName === productName)) {
                      cartItems.push(product);
                    }
                  }
                });
              }
            );
          }
        });
  
        this.items = cartItems;
        this.itemsSubject.next(cartItems); // Notify subscribers about the change
        this.itemsNumber = cartItems.length;
        this.productQuantities = productQuantities;
      }
    );
  }
  
  

  deleteCart(id: string): void {
    console.log('executed');
    let cartToDelete: any; // Assuming the type of cart object, adjust accordingly
  
    this.cartService.getAllCart().subscribe(
      carts => {
        // Find the first cart entry with the matching product ID
        cartToDelete = carts.find(cart => cart.productID.toString().toLowerCase() === id.toString().toLowerCase());
  
        if (cartToDelete) {
          // Delete the found cart using the cartService
          this.cartService.deleteCart(cartToDelete.cartID).subscribe(
            response => {
              console.log(response);
              this.getCartItemsById(this.userId);
            }
          );
        }
      }
    );
  }
  

  getCartOwnerName(userId: string): string {
    // const user = this.users.find((user) => user.userID === userId);
    const user = this.userService
    .getAllUsers()
      .subscribe(
        response => {
          const myUser = response.find((user) => user.userID === userId);
          if (myUser) {
            console.log(myUser);
            return myUser.username;
          } else {
            return 'not found';
          }
        }
      )

      return 'Invalid Request';
  }

  getProductQuantity(productName: string): number {
    // Use the productQuantities object to get the quantity for the given product name
    return this.productQuantities[productName] || 0;
  }
  
  

  goBack(): void{
    return this.location.back();
  }

  getSubTotal(): number{
    var total: number = 0;
    this.items.forEach(item => (item.price)?
    total = item.price * this.getProductQuantity(item.productName) : null );

    return total;
  }

  getTotal(): number{
    return this.getSubTotal() + this.getShippingCharge();
  }

  getShippingCharge(): number {
    return this.selectedShippingMethod === 'standard' ? 60 : 120;
  }

  onShippingMethodChange(event: any): void {
    this.selectedShippingMethod = event.target.value;
  }

  getItemsNumber(): number{
    var num = 0;
    this.items.forEach((item) => {
      num+=1;
    });
    return num;
  }
}
