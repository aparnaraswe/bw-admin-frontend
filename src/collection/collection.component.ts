import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface Product {
  brand: string;
  name: string;
  price: number;
  defaultImg: string;
  hoverImg: string;
}



@Component({
  selector: 'app-collection',
  imports: [CommonModule,RouterModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {


    category: string | null = null;
products: Product[] = [];


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.loadProducts(this.category);
    });
  }

  
  loadProducts(category: string | null) {
    // Demo clothing products with real images
    // this.products = [
    //   { id: 1, name: 'Classic Hooddddddie', brand :  "bw" , defaultImg  : "", image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop', price: '$120' },
    //   { id: 2, name: 'Denim Jacket',brand :  "bw" , image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop', price: '$180' },
    //   { id: 3, name: 'White T-Shirt',brand :  "bw" , image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop', price: '$35' },
    //   { id: 4, name: 'Black Sneakers',brand :  "bw" , image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop', price: '$90' },
    //   { id: 5, name: 'Leather Jacket',brand :  "bw" , image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop', price: '$250' },
    //   { id: 6, name: 'Slim Fit Jeans',brand :  "bw" , image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop', price: '$70' },
    // ];

       this.products = [
      {
        brand: 'Natura Edition',
        name: 'Classic Oversized',
        price: 500,
        defaultImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        hoverImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
      },
      {
        brand: 'Natura Edition',
        name: 'Slim Fit Hoodie',
        price: 700,
        defaultImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        hoverImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
      },
       {
        brand: 'Natura Edition',
        name: 'Slim Fit Hoodie',
        price: 700,
        defaultImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        hoverImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
      },
       {
        brand: 'Natura Edition',
        name: 'Slim Fit Hoodie',
        price: 700,
        defaultImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        hoverImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
      },
       {
        brand: 'Natura Edition',
        name: 'Slim Fit Hoodie',
        price: 700,
        defaultImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
        hoverImg: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop'
      },
      // add as many products as needed
    ];
  }


  }

