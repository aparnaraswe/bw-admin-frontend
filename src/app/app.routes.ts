import { Routes } from '@angular/router';
import { CollectionComponent } from '../collection/collection.component';
import { HomeComponent } from '../home/home.component';
import { ProductComponent } from '../product/product.component';
import { LoginComponent } from '../login/login.component';
import { ContactComponent } from '../contact/contact.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { SizechartComponent } from '../sizechart/sizechart.component';
import { FaqComponent } from '../faq/faq.component';
import { OrdersComponent } from '../orders/orders.component';
import { OrderdetailsComponent } from '../order-details/order-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AddProductsComponent } from '../add-products/add-products.component';

export const routes: Routes = [
  // 👇 Login as entry page
  { path: '', component: LoginComponent },

  // 👇 Home is now the layout container
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'product', redirectTo: 'product', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders-details', component: OrderdetailsComponent },
      { path: 'collection', component: CollectionComponent },
      { path: 'product', component: ProductComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'size-chart', component: SizechartComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'add-products', component: AddProductsComponent },
      { path: 'add-products/:id', component: AddProductsComponent },
    ],
  },

  // 👇 Fallback route
  { path: '**', redirectTo: '' },
];
