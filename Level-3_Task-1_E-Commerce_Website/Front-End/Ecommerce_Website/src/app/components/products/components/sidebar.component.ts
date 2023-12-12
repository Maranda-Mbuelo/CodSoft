import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="sidebar">
    <div class="sidebar-header">
      <h3>Menu</h3>
    </div>
    <ul class="list-unstyled components">
      <li *ngFor="let link of links" class="nav-item">
        <a [routerLink]="link.route" class="nav-link">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
  
  `,
  styles: [
    `/* sidebar.component.css */
.sidebar {
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #333; /* Sidebar background color */
    padding-top: 20px;
  }
  
  .sidebar h3 {
    color: #fff; /* Sidebar header color */
    padding: 20px;
    text-align: center;
  }
  
  .list-unstyled {
    list-style: none;
    padding: 0;
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;
    display: block;
    padding: 20px;
    margin: 2px 0;
    font-size: 1.3rem;
    border-radius: 6px;
    transition: background-color 0.2s;
  }
  
  .nav-link:hover {
    background-color: #444; /* Hover effect color */
  }
  `
  ]
})
export class SidebarComponent {
  links = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' },
    { label: 'Personal Info', route: '/personal-info' },
    { label: 'Settings', route: '/settings' },
    { label: 'Cart', route: '/cart' },
    { label: 'FAQs', route: '/faqs' }
  ];
}
