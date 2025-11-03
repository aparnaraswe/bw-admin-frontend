import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-products',
  imports: [CommonModule,FormsModule,HttpClientModule,RouterModule],
  providers: [AuthService],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  product = {
      name: '',
      description: '',
      category: null,
      subcategory :null,
      price: null,
      quantity : null,
      size: null,
      color: null,
      image: null
  };
  selectedColors: any[] = [];
  selectedVariants: any[] = []; // Stores {colorId, sizeId}
  openColorDropdowns: number[] = []; // IDs of colors whose dropdown is open

  categories: any[] = [];
  subcategories: any[] = [];
  sizes: any[] = [];
  colours: any[] = [];
  imageError: string | null = null;
  productId =  "";

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') as string;
    this.fetchProducts();
  };

    onColorSelect(event: any, color: any) {
    if (event.target.checked) {
      if (!this.isColorSelected(color.id)) this.selectedColors.push(color);
    } else {
      this.selectedColors = this.selectedColors.filter(c => c.id !== color.id);
      // Remove all variants of this color
      this.selectedVariants = this.selectedVariants.filter(v => v.colorId !== color.id);
    }
  }

  isColorSelected(colorId: number) {
    return this.selectedColors.some(c => c.id === colorId);
  }
  toggleColorDropdown(colorId: number) {
  if (this.openColorDropdowns.includes(colorId)) {
    this.openColorDropdowns = this.openColorDropdowns.filter(id => id !== colorId);
  } else {
    this.openColorDropdowns.push(colorId);
  }
}


isColorDropdownOpen(colorId: number) {
  return this.openColorDropdowns.includes(colorId);
}


  /** Size checkbox selection for a color */
  onSizeSelect(event: any, colorId: number, sizeId: number) {
    if (event.target.checked) {
      if (!this.isVariantSelected(colorId, sizeId)) {
        this.selectedVariants.push({ colorId, sizeId });
      }
    } else {
      this.selectedVariants = this.selectedVariants.filter(
        v => !(v.colorId === colorId && v.sizeId === sizeId)
      );
    }
  }

  isVariantSelected(colorId: number, sizeId: number) {
    return this.selectedVariants.some(v => v.colorId === colorId && v.sizeId === sizeId);
  }





  fetchProducts() {
    this.authService.fetchProducts(this.productId).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          const data = res.data;
          this.colours = data.colours;
          this.sizes = data.sizes;
          this.categories = data.categories;
          this.subcategories = data.subcategories;

          if (data.product) {
            this.product = {
              name: data.product.name,
              description: data.product.description,
              category: data.product.category?.id || null,
              subcategory: data.product.subcategory?.id || null,
              size: data.product.size?.id || null,
              color: data.product.color?.id || null,
              price: data.product.price,
              quantity :  data.product.quantity,
              image: data.product.image,
            };
          }
        }
      },
      error: (err) => console.error(err)
    });
  }


submitProduct() {
  const payload = {
    productId: this.productId || null,
    name: this.product.name,
    description: this.product.description,
    category: this.product.category,
    subcategory: this.product.subcategory,
    price: this.product.price,
    quantity: this.product.quantity,
    image: this.product.image,
    variants: this.selectedVariants
  };
    this.authService.addProduct(payload , this.productId).subscribe({
    next: (res: any) => {
      if (res.success) {
        this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.warning(res.message, 'Warning');
      }
    },
    error: (err: any) => {
      if (err?.error?.errors) {
        err.error.errors.forEach((msg: string) =>
          this.toastr.error(msg, 'Validation Error')
        );
      } else {
        this.toastr.error(err.error?.message || 'Something went wrong!', 'Error');
      }
    },
  });
  }


  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSizeMB = 2; // max 2MB
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Only JPG/PNG images are allowed';
        this.product.image = null;
        return;
      }
      if (file.size / 1024 / 1024 > maxSizeMB) {
        this.imageError = 'File size should be less than 2MB';
        this.product.image = null;
        return;
      }
      this.product.image = file;
      this.imageError = null;
    } else {
      this.imageError = 'Please select an image';
      this.product.image = null;
    }
  }

}
