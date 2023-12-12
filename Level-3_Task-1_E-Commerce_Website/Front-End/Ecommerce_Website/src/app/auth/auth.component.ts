import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="mywrap">
    <div class="fixed inset-0 bg-black opacity-20"></div>
    <div class="container mt-5" id="container">
        <div class="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fa-brands fa-google" style="color: #212535;"></i>+</a>
              <a href="#" class="social"><i class="fa-brands fa-facebook" style="color: #212535;"></i></a>
              <a href="#" class="social"><i class="fa-brands fa-windows" style="color: #212535;"></i></a>
            </div>
            <span>Get started by creating an account with the available options.</span>
            <input [(ngModel)]="name" name="name" type="text" placeholder="name" class="my-rounded-md">
            <input [(ngModel)]="email" name="email" type="email" placeholder="Email" class="my-rounded-md">
            <input [(ngModel)]="password" name="password" type="password" placeholder="Password" class="my-rounded-md">
            <button class="mt-2">Create Account</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Sign In</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fa-brands fa-google" style="color: #212535;"></i>+</a>
              <a href="#" class="social"><i class="fa-brands fa-facebook" style="color: #212535;"></i></a>
              <a href="#" class="social"><i class="fa-brands fa-windows" style="color: #212535;"></i></a>
            </div>
            <span>Alternatively, log in with your existing account.</span>
            <input [(ngModel)]="email" name="name" type="email" placeholder="Email" class="my-rounded-md">
            <input [(ngModel)]="password" name="password" type="password" placeholder="Password" class="my-rounded-md">
            <a href="#">Forgot Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <i class="fa-brands fa-square-pied-piper fa-2x px-2" style="position: relative; bottom: 2rem;"></i>
              <h1>Welcome back!</h1>
              <p>To keep connected with us, please log in</p>
              <button class="ghost" id="signIn" (click)="signInOrSignUp()">Sign in</button>
            </div>
            <div class="overlay-panel overlay-right">
              <i class="fa-brands fa-square-pied-piper fa-2x px-2" style="position: relative; bottom: 2.5rem;"></i>
              <h1>Hello Friend!</h1>
              <p>Enter Your personal details and start your journey</p>
              <button class="ghost" id="signUp" (click)="signInOrSignUp()">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <footer class="text-body-secondary text-center text-small">
        <p class="mb-1 mt-4">© 2023 Mbuelo Maranda</p>
        <ul class="list-inline">
          <li class="list-inline-item"><a href="#">Privacy</a></li>
          <li class="list-inline-item"><a href="#">Terms</a></li>
          <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
      </footer>
</div>
  `,
  styles: [
    `@import url('https://fonts.googleapis.com/css2?family=Gabarito&family=Ysabeau+Office:wght@100&display=swap');

    .mywrap{
        background: #f6f5f7;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-family: 'Gabarito', sans-serif!important;
        width: 100%;
        height: 100vh!important;
        overflow: hidden;
    }
    
    .my-rounded-md{
        border-radius: 10px!important;
    }
    
    h1{
        font-weight: bold;
        font-size: 2rem;
        margin: 0;
    }
    
    h2{
        text-align: center;
    }
    
    p{
        font-size: 1rem;
        font-weight: 100;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
    }
    span{
        font-size: 1rem;
    }
    
    a{
        color: #333;
        font-size: 1rem;
        text-decoration: none;
        margin: 15px 0;
    }
    
    button{
        border-radius: 20px;
        border: 1px solid #212535;
        background-color: #212535;
        color: #FFFFFF;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
    }
    
    button:active{
        transform: scale(0.95);
    }
    
    button:focus{
        outline: none;
    }
    
    button.ghost {
        background-color: transparent;
        border-color: #FFFFFF;
    }
    
    form {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        text-align: center;
    }
    
    input{
        background-color: #eee;
        color: #1b1e2b;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
        outline: none;
    }
    
    input:focus {
        box-shadow: 0 0 8px #212535;
        border: 2px solid #2125358f;
    }
    
    .container{
        background-color: #fff;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        width: 60%;
        min-height: 480px;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        box-shadow: 0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.507), -0.3rem -0.3rem 0.3rem rgba(0, 0, 0, 0.315);
    
    }
    
    .form-container{
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }
    
    .sign-in-container{
        left: 0;
        width: 50%;
        z-index: 2;
    }
    
    .container.right-panel-active .sign-in-container{
        transform: translateX(100%);
    }
    
    .sign-up-container {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }
    
    .container.right-panel-active .sign-up-container{
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: show 0.6s;
    }
    
    @keyframes show {
        0%, 49.99% {
            opacity: 0;
            z-index: 1;
        }
    
        50%, 100%{
            opacity: 1;
            z-index: 5;
        }
    }
    
    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        z-index: 100;
        transition: 0.6s ease-in-out;
    }
    
    .container.right-panel-active .overlay-container{
        transform: translateX(-100%);
    }
    
    .overlay{
        background: #212535;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 0;
        color: #FFFFFF;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: 0.7s ease-in-out;
    }
    
    .container.right-panel-active .overlay{
        transform: translateX(50%);
    }
    
    
    .overlay-panel {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 40px;
        text-align: center;
        top: 0;
        height: 100%;
        width: 50%;
        transform: translateX(0);
    }
    
    .overlay-left{
        transform: translateX(-20%);
        transition: 1s ease-in-out;
    }
    
    .container.right-panel-active .overlay-left {
        transform: translateX(0);
    }
    
    .overlay-right{
        right: 0;
        transform: translateX(0);
        transition: 1s ease-in-out;
    }
     
    .container.right-panel-active .overlay-right{
        transform: translateX(20%);
    }
    
    .social-container{
        margin: 20px 0;
    }
    
    .social-container a{
        border: 1px solid #2125356e;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        height: 40px;
        width: 40px;
        box-shadow: 0 0 6px 0 #212535;
        transition: box-shadow 0.3s ease;
    }
    
    .social-container a:hover {
        box-shadow: 0 0 12px 0 #2b3046cc;
    }`
  ]
})
export class AuthComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp') as HTMLElement;
    const signInButton = document.getElementById('signIn') as HTMLElement;
    const container = document.getElementById('container') as HTMLElement;

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  signInOrSignUp(): void {
    this.name = '';     // Clear the name input
    this.email = '';    // Clear the email input
    this.password = ''; // Clear the password input
  }
}

