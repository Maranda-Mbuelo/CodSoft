import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="bg-gray-800 p-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0">
            <a
              class="flex text-white text-lg font-semibold hover:text-indigo-300 cursor-help"
            >
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024.00 1024.00"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
                stroke-width="7.168000000000001"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z"
                    fill="#050D42"
                  ></path>
                  <path
                    d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z"
                    fill="#2F4BFF"
                  ></path>
                </g>
              </svg>
              Project Management Tool
            </a>
          </div>
          <div class="hidden md:block pr-10">
            <ul class="ml-4 flex space-x-4">
              <li *ngFor="let x of navigationLinks">
                <a [href]="x.linkRoute" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page" >{{x.linkName}}</a>
              </li>
            </ul>
          </div>
          <div class="md:hidden">
            <button
              type="button"
              class="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Toggle menu"
              (click)="toggleMobileMenu()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <ul
          class="md:hidden"
          [ngClass]="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        >
          <li *ngFor="let x of navigationLinks">
            <a [href]="x.linkRoute" class="block px-4 py-2 text-sm text-gray-300 hover:text-white"
              >{{x.linkName}}</a
            >
          </li>
        </ul>
      </div>
    </nav>

  `,
  styles: [
    
  ],
})
export class NavbarComponent {
  isMobileMenuOpen: boolean = false;
  navigationLinks: Array<any> = [
    {
      linkName: 'home',
      linkRoute: 'mbueloAtCodSoft/home',
      linkIcon: ''
    },
    {
      linkName: 'projects',
      linkRoute: 'mbueloAtCodSoft/projects',
      linkIcon: ''
    },
    {
      linkName: 'setings',
      linkRoute: 'mbueloAtCodSoft/settings/',
      linkIcon: ''
    },
    {
      linkName: 'sign out',
      linkRoute: 'mbueloAtCodSoft/signout/',
      linkIcon: ''
    },
  ]

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
