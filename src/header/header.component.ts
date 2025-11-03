import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../services/cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';

interface NavLink {
  label: string;
  routerLink?: string;
}

interface NavColumn {
  title: string;
  links: NavLink[];
}

interface NavItem {
  label: string;
  dropdown?: NavColumn[];
  expanded?  : boolean
}



@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule,FormsModule,CartPopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItems: CartItem[] = [];
  cartVisible = false;
  isShrunk = false;


  selectedNav: string | null = null;
  searchQuery: string = '';
  searchActive: boolean = false;
  mobileMenuOpen = false;
  

  constructor(public cartService: CartService) {
    // Subscribe to cart items & visibility
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.cartVisible$.subscribe(visible => this.cartVisible = visible);
  }

  openCart() {
    this.cartService.showCart();
  }


toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}



  navItems: NavItem[] = [
    {
      label: 'BW',
      dropdown: [
        {
          title: 'Shop',
          links: [
            { label: 'New Release (click this)', routerLink: '/collection' },
            { label: 'Tops', routerLink: '/tops' },
            { label: 'Bottoms', routerLink: '/bottoms' },
            { label: 'Knitwear', routerLink: '/knitwear' },
            { label: 'Outerwear', routerLink: '/outerwear' },
            { label: 'Denim', routerLink: '/denim' },
            { label: 'Suiting', routerLink: '/suiting' },
            { label: 'Lounge', routerLink: '/lounge' },
            { label: 'Footwear', routerLink: '/footwear' },
            { label: 'Accessories', routerLink: '/accessories' },
            { label: 'Shop All', routerLink: '/shop-all' }
          ]
        },
        {
          title: 'Civil Collection',
          links: [
            { label: 'Shop', routerLink: '/shop-civil' },
            { label: 'Campaign', routerLink: '/campaign-civil' },
            { label: 'Lookbook', routerLink: '/lookbook-civil' },
            { label: 'Playlist', routerLink: '/playlist-civil' }
          ]
        },
        {
          title: 'Eternal 2025',
          links: [
            { label: 'Shop', routerLink: '/shop-eternal' },
            { label: 'Lookbook', routerLink: '/lookbook-eternal' }
          ]
        }
      ]
    },
    {
      label: 'ESSENTIALS',
      dropdown: [
        {
          title: 'Shop',
          links: [
            { label: 'New Arrivals', routerLink: '/essentials-new' },
            { label: 'Tops', routerLink: '/essentials-tops' },
            { label: 'Bottoms', routerLink: '/essentials-bottoms' },
            { label: 'Outerwear', routerLink: '/essentials-outerwear' },
            { label: 'Footwear', routerLink: '/essentials-footwear' },
            { label: 'Accessories', routerLink: '/essentials-accessories' }
          ]
        },
        {
          title: 'Collections',
          links: [
            { label: 'Fall Collection', routerLink: '/essentials-fall' },
            { label: 'Spring Collection', routerLink: '/essentials-spring' },
            { label: 'Lookbook', routerLink: '/essentials-lookbook' },
            { label: 'Campaign', routerLink: '/essentials-campaign' }
          ]
        }
      ]
    },
    {
      label: 'ATHLETICS',
      dropdown: [
        {
          title: 'Shop',
          links: [
            { label: 'New Arrivals', routerLink: '/athletics-new' },
            { label: 'Tops', routerLink: '/athletics-tops' },
            { label: 'Bottoms', routerLink: '/athletics-bottoms' },
            { label: 'Outerwear', routerLink: '/athletics-outerwear' },
            { label: 'Footwear', routerLink: '/athletics-footwear' },
            { label: 'Accessories', routerLink: '/athletics-accessories' }
          ]
        },
        {
          title: 'Collections',
          links: [
            { label: 'Fall Collection', routerLink: '/athletics-fall' },
            { label: 'Spring Collection', routerLink: '/athletics-spring' },
            { label: 'Lookbook', routerLink: '/athletics-lookbook' },
            { label: 'Campaign', routerLink: '/athletics-campaign' }
          ]
        }
      ]
    }
  ];

  

  setActive(label: string) {
  this.selectedNav = label;
  }

 


toggleSearch(force?: boolean) {
  this.searchActive = force !== undefined ? force : !this.searchActive;
}

onSearch() {
  if (this.searchQuery.trim()) {
    // your search logic here
  }

}

  rightNav = [
    
    { label: 'BAG', action: () => this.openCart()},
    { label: 'ACCOUNT', routerLink: '/login' },
  ];

  get cartCount(): number {
    return this.cartItems.reduce((sum, i) => sum + (i.qty || 1), 0);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const threshold = 20;
    this.isShrunk = (window.scrollY || document.documentElement.scrollTop || 0) > threshold;
  }

}
