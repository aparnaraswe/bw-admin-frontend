import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports  : [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form Submitted', this.contact);
    alert('Your message has been sent!');
    this.contact = { name: '', email: '', message: '' }; // reset form
  }
}
