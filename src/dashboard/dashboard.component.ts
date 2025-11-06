import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService],
  imports : [CommonModule,FormsModule,HttpClientModule]
})
export class DashboardComponent implements AfterViewInit {

  totalOrders = 0;
  totalCustomers = 0;
  totalRevenue = 0;
  openIssues = 0;

  recentOrders: any[] = [];
  pendingIssues: any[] = [];

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {

    // KPI Data
    this.authService.getDashboardStats().subscribe((res: any) => {
      if (res.success) {
        this.totalOrders = res.data.totalOrders;
        this.totalCustomers = res.data.totalCustomers;
        this.totalRevenue = res.data.totalRevenue;
        this.openIssues = res.data.openIssues;
      }
    });

    // Recent Orders
    this.authService.getRecentOrders().subscribe((res: any) => {
      this.recentOrders = res.data.orders;
      this.initOrdersChart(res.data.statusStats);
    });

    // Issues
    this.authService.getPendingIssues().subscribe((res: any) => {
      this.pendingIssues = res.data.issues;
    });
  }

  initOrdersChart(stats: any) {
    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Confirmed', 'Delivered'],
        datasets: [{
          data: [
            stats.pending,
            stats.confirmed,
            stats.delivered
          ]
        }]
      }
    });
  }
}
