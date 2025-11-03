import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-details',
  imports : [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderdetailsComponent {
  @Input() order: any; // Pass the order object from parent
}
