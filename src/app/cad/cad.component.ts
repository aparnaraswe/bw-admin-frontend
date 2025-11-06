import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

interface Card {
  cardNo: number;
  bags: number;
  weigth: number;
  ischecked: boolean;
}

@Component({
  selector: 'app-cad',
  providers: [AuthService],
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './cad.component.html',
  styleUrl: './cad.component.css'
})
export class CadComponent {

  summary: any[] = [];
  stackDetails: any[] = []; 
  bagsCount: number = 0;
  weigthCount: number = 0;

  newStack = {
    stackNo: '',
    bags: '',
    weigth: ''
  };

  orders: Card[] = [
    { cardNo: 1, bags: 10, weigth: 10, ischecked: false },
    { cardNo: 2, bags: 50, weigth: 10, ischecked: false },
    { cardNo: 3, bags: 19, weigth: 10, ischecked: false },
    { cardNo: 4, bags: 10, weigth: 90, ischecked: false },
    { cardNo: 5, bags: 10, weigth: 10, ischecked: false }
  ];

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  recalcTotals() {
    this.bagsCount = this.summary.reduce((sum, v) => sum + Number(v.bags), 0);
    this.weigthCount = this.summary.reduce((sum, v) => sum + Number(v.weigth), 0);
  }

 onCadSelected(event: any, cardNo: number) {
  const selectedCad = this.orders.find(v => v.cardNo === cardNo);

  if (!selectedCad) return;

  if (event.target.checked) {
    this.summary.push(selectedCad);
    this.stackDetails.push({
      cardNo: selectedCad.cardNo,
      stackNo: '',
      bags: '',
      weigth: ''
    });
  } else {
    const index = this.summary.findIndex(v => v.cardNo === cardNo);
    this.summary.splice(index, 1);
    this.stackDetails.splice(index, 1);
  }

  this.recalcTotals();
 }

 removeStack(index: number) {
  this.summary.splice(index, 1);
  this.stackDetails.splice(index, 1);
  this.recalcTotals();
}



  addStack() {
    if (!this.newStack.stackNo || !this.newStack.bags || !this.newStack.weigth) {
      this.toastr.error("All stack fields are required", 'Validation Error');
      return;
    }

    if (isNaN(Number(this.newStack.stackNo)) || isNaN(Number(this.newStack.bags)) || isNaN(Number(this.newStack.weigth))) {
      this.toastr.error("Stack details must be numbers", "Validation Error");
      return;
    }

    this.stackDetails.push({
      stackNo: Number(this.newStack.stackNo),
      bags: Number(this.newStack.bags),
      weigth: Number(this.newStack.weigth)
    });

    this.newStack = { stackNo: '', bags: '', weigth: '' }; // reset fields
  }

  submitData() {
    if (this.summary.length === 0) {
      this.toastr.error("At least one CAD must be selected", "Validation Error");
      return;
    }

    if (this.stackDetails.length === 0) {
      this.toastr.error("You must add at least one Stack entry", "Validation Error");
      return;
    }

    const payload = {
      productId: 1, // if needed
      summary: this.summary,
      stackDetails: this.stackDetails,
      bagsCount: this.bagsCount,
      weigthCount: this.weigthCount
    };

    this.authService.addCadDetails(payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toastr.success("CAD Saved Successfully");
        }
      },
      error: (err: any) => {
        this.toastr.error(err.error?.message || "Error while saving!");
      }
    });
  }
}
