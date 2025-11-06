import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-issues',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './customer-issues.component.html',
  styleUrls: ['./customer-issues.component.css'],
  providers: [AuthService]
})
export class CustomerIssuesComponent {

  issues: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalCount: number = 0;
  expandedIssueId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getIssues();
  }

  toggleExpand(id: number) {
    this.expandedIssueId = this.expandedIssueId === id ? null : id;
  }

  getIssues(page: number = 1): void {
    this.isLoading = true;

    this.authService.fetchCustomerIssues(page, this.itemsPerPage).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (res.success) {
          this.issues = res.data.issues;
          this.currentPage = res.data.currentPage;
          this.totalCount = res.data.totalCount;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error("Error fetching issues:", err);
        this.toastr.error("Failed to load customer issues");
      }
    });
  }

  totalPages(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.getIssues(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getIssues(this.currentPage);
    }
  }

}
