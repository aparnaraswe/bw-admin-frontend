import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';
import Lenis from '@studio-freight/lenis';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private lenis!: Lenis;
  private animationFrameId!: number;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    // Initialize AOS (scroll animations)
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
      startEvent: 'DOMContentLoaded',
      disable: 'mobile'
    });
  }

  ngAfterViewInit() {
    // Initialize Lenis smooth scrolling
    this.lenis = new Lenis({
      duration: 1.2, // adjust smoothness
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // custom easing
      smoothWheel: true,
      // smoothTouch: false
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      this.animationFrameId = requestAnimationFrame(raf);
    };
    this.animationFrameId = requestAnimationFrame(raf);

    // Parallax effect for hero section
    const parallaxBg = document.querySelector<HTMLElement>('.parallax-bg');
    if (parallaxBg) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      });
    }

    // Staggered animations
    const staggerItems = document.querySelectorAll<HTMLElement>('.stagger-item');
    staggerItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Split text effect
    const splitTextElements = document.querySelectorAll<HTMLElement>('.split-text');
    splitTextElements.forEach(element => {
      const text = element.textContent;
      if (text) element.setAttribute('data-text', text);
    });

    // Ripple button effect
    const buttons = document.querySelectorAll<HTMLElement>('.ripple-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function (e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.lenis) {
      this.lenis.destroy();
    }
  }

  // ====== UI Data ======

  isMobileMenuOpen = false;

  hero = {
    image: '/bg-1.png',
    title: 'NEW SEASON — MINIMAL ESSENTIALS',
    subtitle: 'Clean silhouettes. Premium materials. Designed to live in.',
    buttonText: 'SHOP NOW'
  };

  featuredProducts = [
    { name: 'Oversized Hoodie', price: '$195', image: '/cart1.jpg' },
    { name: 'Minimal Sneaker', price: '$395', image: '/cart2.jpg' },
    { name: 'Tailored Trouser', price: '$295', image: '/category2.png' },
    { name: 'Everyday Tee', price: '$125', image: '/category1.png' }
  ];

  collections = [
    { title: "MEN'S", image: '/category1.png', size: 'small', buttonText: 'EXPLORE' },
    { title: "WOMEN'S", image: '/category2.png', size: 'small', buttonText: 'EXPLORE' },
    { title: "ACCESSORIES", image: '/category3.png', size: 'small', buttonText: 'EXPLORE' }
  ];

  newsletter = {
    title: 'STAY UPDATED',
    subtitle: 'Subscribe to receive updates on new arrivals and exclusive offers',
    placeholder: 'Enter your email',
    buttonText: 'SUBSCRIBE'
  };

  announcement = {
    text: 'FREE SHIPPING OVER $150 • NEW COLLECTION NOW LIVE',
    linkText: 'SHOP NOW',
    link: '/collection'
  };

  // Quick View modal state
  quickViewOpen = false;
  selectedProduct: any = null;

  openQuickView(product: any) {
    this.selectedProduct = {
      ...product,
      colors: ['Black', 'Stone', 'Olive'],
      sizes: ['S', 'M', 'L', 'XL']
    };
    this.quickViewOpen = true;
  }

  closeQuickView() {
    this.quickViewOpen = false;
    this.selectedProduct = null;
  }

  addQuickViewToBag() {
    if (!this.selectedProduct) return;

    const item: CartItem = {
      name: this.selectedProduct.name,
      img: this.selectedProduct.image,
      price: this.selectedProduct.price,
      qty: 1,
      color: this.selectedProduct.colors?.[0] || 'Default',
      size: this.selectedProduct.sizes?.[0] || 'M'
    };
    this.cartService.addToCart(item);
    this.closeQuickView();
  }
}
