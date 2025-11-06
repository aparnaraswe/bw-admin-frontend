import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  orders: any[] = [];
  expandedOrderId: number | null = null;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  toggleExpand(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  getOrders(page: number = 1, limit: number = 10) {
    this.isLoading = true;
    
    this.authService.fetchOrders(page, limit).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log('Backend response:', res);

        if (res.success) {
          this.orders = res.data.orders;
          this.currentPage = res.data.currentPage;
          this.itemsPerPage = res.data.itemsPerPage;
          this.totalCount = res.data.totalCount;
        } else {
          this.toastr.error("Failed to load orders");
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error while loading orders:', err);
        this.toastr.error("Unable to load orders", "Error");
      }
    });
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalCount) {
      this.currentPage++;
      this.getOrders(this.currentPage, this.itemsPerPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getOrders(this.currentPage, this.itemsPerPage);
    }
  }

  totalPages(): number {
  return Math.ceil(this.totalCount / this.itemsPerPage);
}

}
