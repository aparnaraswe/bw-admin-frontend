import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  imports: [FormsModule,CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
faqs = [
    { question: 'How do I place an order?', answer: 'You can place an order by selecting the products and completing the checkout process.', open: false },
    { question: 'What is your return policy?', answer: 'You can return items within 30 days of delivery for a full refund, provided they are unused and in original packaging.', open: false },
    { question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries. Shipping fees and delivery times vary depending on the destination.', open: false },
    { question: 'How can I track my order?', answer: 'After your order is shipped, you will receive a tracking number via email.', open: false },
    { question: 'How can I contact customer support?', answer: 'You can reach our support team via email at support@yourbrand.com or call us at +1 (555) 123-4567.', open: false },
  ];

}
