import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';
import { CartService, CartItem } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  size: string;
  color: string;
  image: string;
  variants : string
}

interface Suggestion {
  img: string;
  brand: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product',
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule,NgxPaginationModule],
  providers: [AuthService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private dialog: MatDialog , private authService: AuthService , private toastr: ToastrService){}
   products: Product[] = [
    // { id: 1, name: 'Men’s T-Shirt', category: 'Tops', price: 25, size: 'M', color: 'Black', image: 'category1.png' },
    // { id: 2, name: 'Cargo Pants', category: 'Bottoms', price: 45, size: 'L', color: 'Green', image: 'category1.png' },
    // { id: 3, name: 'Oversized Hoodie', category: 'Outerwear', price: 60, size: 'XL', color: 'Gray', image: 'category1.png' },
    // { id: 4, name: 'Slim Fit Jeans', category: 'Bottoms', price: 50, size: 'M', color: 'Blue', image: 'category1.png' },
    // { id: 5, name: 'Crew Neck Sweatshirt', category: 'Tops', price: 35, size: 'L', color: 'Navy', image: 'category1.png' },
    // { id: 6, name: 'Puffer Jacket', category: 'Outerwear', price: 90, size: 'XL', color: 'Black', image: 'category1.png' },
    // { id: 7, name: 'Jogger Pants', category: 'Bottoms', price: 40, size: 'M', color: 'Gray', image: 'category1.png' },
    // { id: 8, name: 'Long Sleeve Polo', category: 'Tops', price: 30, size: 'L', color: 'White', image: 'category1.png' },
    // { id: 9, name: 'Denim Jacket', category: 'Outerwear', price: 70, size: 'L', color: 'Blue', image: 'category1.png' },
    // { id: 10, name: 'Athletic Shorts', category: 'Bottoms', price: 28, size: 'M', color: 'Black', image: 'category1.png' },
    // { id: 11, name: 'Henley Shirt', category: 'Tops', price: 32, size: 'S', color: 'Olive', image: 'category1.png' },
    // { id: 12, name: 'Raincoat', category: 'Outerwear', price: 85, size: 'XL', color: 'Yellow', image: 'category1.png' },
    // { id: 13, name: 'Chino Pants', category: 'Bottoms', price: 42, size: 'L', color: 'Beige', image: 'category1.png' },
    // { id: 14, name: 'Graphic Tee', category: 'Tops', price: 22, size: 'M', color: 'White', image: 'category1.png' },
    // { id: 15, name: 'Windbreaker', category: 'Outerwear', price: 65, size: 'L', color: 'Red', image: 'category1.png' },
    // { id: 16, name: 'Track Pants', category: 'Bottoms', price: 38, size: 'XL', color: 'Navy', image: 'category1.png' },
    // { id: 17, name: 'V-Neck Sweater', category: 'Tops', price: 48, size: 'L', color: 'Charcoal', image: 'category1.png' },
    // { id: 18, name: 'Wool Overcoat', category: 'Outerwear', price: 120, size: 'XL', color: 'Brown', image: 'category1.png' }
   ];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  filteredProducts: Product[] = [];
  categories: string[] = [];

  // Filter form fields
  searchText: string = '';
  selectedCategory: string = 'All';
  sortOption: string = 'default';

  ngOnInit(): void {
    // Populate dropdown categories (unique from product list)
    this.categories = Array.from(new Set(this.products.map(p => p.category)));
    this.filteredProducts = [...this.products]; // initial view
    this.fetchAllProducts()
  }

  onPageChange(page: number): void {
  this.currentPage = page;
  this.fetchAllProducts();
}


fetchAllProducts(): void {
  this.authService.fetchAllProducts(this.currentPage, this.itemsPerPage).subscribe({
    next: (res: any) => {
      if (res.success && res.data) {

        // ✅ Set products for this page
        this.products = res.data.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          size: p.size,
          color: p.color,
          variants : p.variants,
          image: 'category1.png'
        }));

        // ✅ Update total items (from backend)
        this.totalItems = res.data.totalCount;

        // ✅ Refresh filters
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        this.filteredProducts = [...this.products];

      } else {
        this.toastr.warning(res.message || 'No products found', 'Warning');
      }
    },
    error: (err: any) => {
      console.error('❌ Error fetching products:', err);
      this.toastr.error(err.error?.message || 'Something went wrong while fetching products', 'Error');
    }
  });
}


  filterProducts(): void {
    let filtered = [...this.products];

    // Search filter
    if (this.searchText.trim() !== '') {
      const query = this.searchText.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Sort option
    if (this.sortOption === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = filtered;
  }

  editProduct(product: Product): void {
    console.log('Editing product:', product);
    // Implement modal or form
  }

  deleteProduct(id: number): void {
  const product = this.products.find(p => p.id === id);
  if (!product) return;

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Delete Product',
      message: `Are you sure you want to delete "${product.name}"?`
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
        this.authService.deleteProduct(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.toastr.success(res.message, 'Success');
          } else {
            this.toastr.warning(res.message, 'Warning');
          }
        },
        error: (err: any) => {
          if (err) {
            // If there are multiple validation errors
            if (err.error.errors && Array.isArray(err.error.errors)) {
              err.error.errors.forEach((errorMsg: string) => {
                this.toastr.error(errorMsg, 'Validation Error');
              });
            } else if (err.error.message) {
              // Generic error message
              this.toastr.error(err.error.message, 'Error');
            }
          } else {
            this.toastr.error('Something went wrong!', 'Error');
          }
        }
        });

    }
    this.fetchAllProducts();
  });
}

}
