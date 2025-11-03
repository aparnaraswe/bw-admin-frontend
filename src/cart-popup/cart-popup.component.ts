import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-popup',
  imports : [CommonModule,RouterModule],
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent {
  @Input() isVisible = false;
  @Input() cartItems: any[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

get subtotal(): number {
    return this.cartItems.reduce((sum, item) => 
        sum + parseFloat(item.price) * item.qty, 0
    );
        

}


viewOrders() {
    // Close cart drawer
    this.closePopup();

    // Redirect to /orders
    this.router.navigate(['/orders']);
  }

  closePopup() {
    this.close.emit();
  }

  increaseQty(index: number) {
    this.cartItems[index].qty++;
  }

  decreaseQty(index: number) {
    if (this.cartItems[index].qty > 1) {
      this.cartItems[index].qty--;
    }
  }
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

}

