import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { IProduct } from 'src/interfaces/IProduct';
import { ProductsService } from 'src/services/products.service';
import { UserService } from 'src/services/user.service';
import { IAddUser, IUser, IUserEdit } from 'src/interfaces/IUser.model';
import { CartService } from 'src/services/cart.service';
import { ICart } from 'src/interfaces/ICart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  links = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' },
    { label: 'Personal Info', route: '/personal-info' },
    { label: 'Settings', route: '/settings' },
    { label: 'Cart', route: '/cart' },
    { label: 'FAQs', route: '/faqs' }
  ];

  private productSubscription!: Subscription;
  private userSubscription!: Subscription;
  private cartSubscription!: Subscription;
  companyName: string = 'tech city';
  companyIcon: string = `<i class="fa-brands fa-square-pied-piper px-2"></i>`;
  products: IProduct[] = [];
  
  users: IUser[] = [];
  carts: ICart[] = [];
  cartCounter: number= 0;


  editedProduct: IProduct ={
    productID: '',
    productName: '',
    description: '',
    price: null,
    stockQuantity: 0,
    imageURL: '',
  }

  editedUser: IUser = {
    userID: '',
    username: '',
    email: '',
    carts: []
  }
  userToBeDeleted: string = '';
  

  constructor(
    private productService: ProductsService, 
    private userService: UserService, 
    private cartService: CartService){}

  ngOnInit(): void{
    this.retrieveAllProducts();
    this.retrieveAllUsers();
    this.retrieveAllCarts();
  }

  // Product Code

  assignProduct(productID: string){
    this.products.forEach((product) => {
      if(product.productID === productID){
        this.editedProduct.productName = product.productName;
        this.editedProduct.productID = product.productID;
        this.editedProduct.description = product.description;
        this.editedProduct.imageURL = product.imageURL;
        this.editedProduct.price = product.price;
        this.editedProduct.stockQuantity = product.stockQuantity;
      }
    });
  }

  clearProduct(): void{
    this.editedProduct.productName = '',
    this.editedProduct.productID = '',
    this.editedProduct.description = '',
    this.editedProduct.imageURL = '',
    this.editedProduct.price = 0,
    this.editedProduct.stockQuantity = 0
  }

  // retrieveAllProducts(): void{
  //   this.productService
  //   .getAllProducts()
  //     .subscribe(
  //       response => {
  //         this.products = response;
  //         // console.log(this.products);
  //         console.log('success');
  //       }
  //     );
  // }

  retrieveAllProducts(): void{
    this.productSubscription = this.productService.data$.subscribe((data) => {
      this.products = data;
      console.log(data);
    });
    this.productService.getAllProducts().subscribe();
  }

  getProductById(id: string): void{
    this.productService.getProductById(id)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }

  addProduct(product: IProduct): void{
    this.productService.addProduct(product)
      .subscribe(
        response => {
          // console.log(response);
          console.log(`Success!`);
        }
      );
      this.clearProduct();
  }

  editProduct(productId: string, newProduct: IProduct): void{
    this.productService.editProduct(productId, newProduct).subscribe(
      response => {
        // console.log(response);
        console.log(`Success!`);
      }
    )
  }

  deleteProduct(id: string): void{
    if(id){
      this.productService.deleteProductById(id)
      .subscribe(
        response => {
          // console.log(response);
          console.log(`Success!`);
        }
      )
    } else{
      return
    }
  }

  // User Code

  assignUser(userID: string){
    this.users.forEach((user) => {
      if(user.userID === userID){
        this.editedUser.userID = userID;
        this.editedUser.username = user.username;
        this.editedUser.email = user.email;
      }
    });
  }

  clearUser(): void{
    this.editedUser.username = '',
    this.editedUser.email = '',
    this.editedUser.userID ='',
    this.editedUser.carts = []
  }

  createUser(): void{
    var user: IAddUser ={
      username: this.editedUser.username,
      email: this.editedUser.email,
    }

    if(user){
      this.addUser(user);
    }
    this.clearUser();
  }

  retrieveAllUsers(): void{
    this.userSubscription = this.userService.data$
      .subscribe(
        response => {
          this.users = response;
          // console.log(this.users);
          console.log('success!');
        }
      );
      this.userService.getAllUsers().subscribe();
  }

  // retrieveAllProducts(): void{
  //   this.productSubscription = this.productService.data$.subscribe((data) => {
  //     this.products = data;
  //     console.log(data);
  //   });
  //   this.productService.getAllProducts().subscribe();
  // }

  getUserById(id: string): void{
    this.userService.getUserById(id)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }

  addUser(user: IAddUser): void{
    this.userService.addUser(user)
      .subscribe(
        response => {
          // console.log(response);
        }
      );
  }

  editUser(userId: string, updatedUser: IUserEdit): void{
    this.userService.editUser(userId, updatedUser)
      .subscribe(
        response => {
          // console.log(response);
          console.log('success!')
        }
      )
  }

  deleteUser(): void{
    this.userService.deleteUser(this.userToBeDeleted)
      .subscribe(
        response => {
          // console.log(response);
          console.log('success!');
        }
      );
    this.userToBeDeleted = '';
  }

  // Mini Function

  assignUserToBeDeleted(id: string): void{
    this.userToBeDeleted = id;
  }

  clearUserToBeDeleted(): void{
    this.userToBeDeleted = '';
  }

  getCart(userId: string): boolean {
    if (userId) {
      return this.carts.some((cart) => cart.ownerUserID === userId);
    }
    return false;
  }

  getCartCount(userId: string): number {
    // Filter the carts array to find all carts owned by the provided userId
    const userCarts = this.carts.filter(cart => cart.ownerUserID === userId);

    // Return the count of userCarts
    return userCarts.length;
  }

  

  // Cart Code

  retrieveAllCarts(): void{
    this.cartService.getAllCart()
      .subscribe(
        response => {
          this.carts = response;
          // console.log(this.carts);
          console.log('success!');
        }
      )
  }

  addCart(cart: ICart){
    this.cartService.createCart(cart)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }

  getCartById(id: string): void{
    this.cartService.getCartById(id)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }

  editCartById(id: string, updatedCart: ICart): void{
    this.cartService.editCart(id, updatedCart)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }

  deleteCart(id: string): void{
    this.cartService.deleteCart(id)
      .subscribe(
        response => {
          console.log(response);
        }
      )
  }

  getCartOwnerName(userId: string): string {
    const user = this.users.find((user) => user.userID === userId);
    if (user) {
      return user.username;
    } else {
      return 'not found';
    }
  }

  getTotalCartPrice(cartOwnerId: string): number {
    // Filter the carts array to find all carts owned by the provided cartOwnerId
    const userCarts = this.carts.filter(cart => cart.ownerUserID === cartOwnerId);

    // Create a map to count how many times each product appears in the user's carts
    const productCounts = new Map<string, number>();

    userCarts.forEach(cart => {
        const productId = cart.productID;
        if (productCounts.has(productId)) {
          productCounts.set(productId, (productCounts.get(productId) || 0) + 1);
      } else {
          productCounts.set(productId, 1);
      }
      
    });

    // Calculate the total price by summing the product prices based on counts
    let totalPrice = 0;
    productCounts.forEach((count, productId) => {
        const product = this.products.find(p => p.productID === productId);
        if (product && product.price !== null) {
            totalPrice += product.price * count;
        }
    });

    return totalPrice;
  }


}
