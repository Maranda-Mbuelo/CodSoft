import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IFeaturette } from 'src/interfaces/IFeaturette';

@Component({
  selector: 'app-product',
  template: `
    <div class="row" *ngIf="!loading">
    <div class="col-md-4" *ngFor="let feature of feature">
        <div class="card rounded mb-4 custom-card d-flex flex-column">
            <img [src]="feature.imageUrl" class="card-img-top" alt="{{ feature.name }}" />
            <div class="card-body">
                <h5 class="card-title">{{ feature.name }}</h5>
                <p class="card-text">{{ feature.description }}</p>
                <p class="text-warning">
                    Price: {{ feature.price | currency: 'R' }}
                </p>
                <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
                    <button type="button" class="btn btn-secondary" (click)="onItemSelected(feature)">Cart  <i class="fa-brands fa-shopify"></i>+</button>
                    <button type="button" class="btn btn-outline-secondary" (click)="onViewClicked(feature)">View <i class="fas fa-eye"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>
  `,
  styles: [
      `img {
        height: 17rem !important;
    }
    
    .custom-card {
        background-color: #333;
        color: white;
        border: 1px solid #444;
        scale: calc(0.82);
    }
    
    p.text-warning{
        font-size: 1.4rem!important;
    }
    
    p.text-warning:hover{
        font-size: 1.6rem;
        text-shadow: 0 0 0.8rem #e45d1ed2;
    }`
  ]
})
export class ProductComponent {
  @Input() loading: boolean = true;
  @Input() feature: IFeaturette[] = [];
  @Output() selectItem = new EventEmitter<IFeaturette>(); // Emit selected item

  constructor(private router: Router) {}

  onItemSelected(item: IFeaturette) {
    this.selectItem.emit(item);
  }

  onViewClicked(item: IFeaturette) {
    const itemName = item.name.toLowerCase().replace(/ /g, '-'); // Create the 'id' from the item name
    this.router.navigate(['product', itemName]); // Navigate to SingleProductComponent with 'id' parameter
  }
}
