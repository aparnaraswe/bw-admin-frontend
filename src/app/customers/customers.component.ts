import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
users: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalCount = 0;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(page: number = 1) {
    this.isLoading = true;
    this.authService.fetchCustomers(page, this.itemsPerPage).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.success) {
          this.users = res.data.users;
          this.totalCount = res.data.totalCount;
          this.currentPage = res.data.currentPage;
        }
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error("Failed to load customers");
      }
    });
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.totalCount) {
      this.currentPage++;
      this.getUsers(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers(this.currentPage);
    }
  }

  totalPages() {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }
}
