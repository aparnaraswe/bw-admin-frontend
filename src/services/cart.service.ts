import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  img: any;
  price: number;
  qty: number;
  color: string;
  size: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.itemsSubject.asObservable();

  private visibilitySubject = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.visibilitySubject.asObservable();

  addToCart(item: CartItem) {
    const current = this.itemsSubject.value;
    this.itemsSubject.next([...current, item]);
    this.showCart(); // ensures the popup opens when adding
  }

  showCart() {
    this.visibilitySubject.next(true);
  }

  hideCart() {
    this.visibilitySubject.next(false);
  }
}
