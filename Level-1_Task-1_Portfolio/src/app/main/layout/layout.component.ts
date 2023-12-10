import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isDesktop: boolean = false;

  ngOnInit() {
    this.checkIfDesktop();
    // You can also listen for window resize events to update the variable dynamically
    window.addEventListener('resize', () => this.checkIfDesktop());
  }

  checkIfDesktop() {
    this.isDesktop = window.innerWidth > 920 && window.innerHeight > 620;
  }
}
