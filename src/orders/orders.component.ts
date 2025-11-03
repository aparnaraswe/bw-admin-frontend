import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
expandedOrderId: number | null = null;

  orders = [
    {
      id: 1,
      order_number: 'ORD-20251103-00123',
      user_name: 'Aparna',
      total_amount: 1200.5,
      final_amount: 1150.5,
      status: 'CONFIRMED',
      createdAt: '2025-11-03T11:00:00Z',
      items: [
        { product_name: 'Blue T-Shirt', variant: 'LARGE - BLUE', quantity: 2, price: 499.5 },
        { product_name: 'Pink Hoodie', variant: 'SMALL - PINK', quantity: 1, price: 299.0 }
      ]
    },
    {
      id: 2,
      order_number: 'ORD-20251103-00124',
      user_name: 'Aniket',
      total_amount: 2200.0,
      final_amount: 2100.0,
      status: 'PENDING',
      createdAt: '2025-11-02T09:30:00Z',
      items: [
        { product_name: 'Black Jeans', variant: '32 - BLACK', quantity: 1, price: 1299.0 },
        { product_name: 'White Shirt', variant: 'MEDIUM - WHITE', quantity: 1, price: 899.0 }
      ]
    },
    {
      id: 3,
      order_number: 'ORD-20251103-00125',
      user_name: 'Riya',
      total_amount: 800.0,
      final_amount: 780.0,
      status: 'DELIVERED',
      createdAt: '2025-11-01T15:10:00Z',
      items: [
        { product_name: 'Grey Top', variant: 'SMALL - GREY', quantity: 2, price: 390.0 }
      ]
    },
     {
      id: 4,
      order_number: 'ORD-20251103-00125',
      user_name: 'Riya',
      total_amount: 800.0,
      final_amount: 780.0,
      status: 'DELIVERED',
      createdAt: '2025-11-01T15:10:00Z',
      items: [
        { product_name: 'Grey Top', variant: 'SMALL - GREY', quantity: 2, price: 390.0 }
      ]
    }
  ];

  toggleExpand(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

}
