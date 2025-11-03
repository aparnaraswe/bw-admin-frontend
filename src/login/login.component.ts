import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,           // for *ngIf, *ngFor
    FormsModule,
    HttpClientModule,
    ToastrModule            // required for routed standalone component
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

 login() {
  this.authService.loginUser(this.email, this.password).subscribe({
    next: (res: any) => {
      console.log('Backend response:', res);
      
      if (res.token) {
        localStorage.setItem('token', res.token);
        const successMsg = res.message || 'Login successful!';
        this.toastr.success(successMsg, 'Success');
        this.router.navigate(['/home']);
      }
    },
    error: (err: any) => {
      console.log('Backend response:', err);
      // Use backend message if available, fallback to generic
      const message = err.error?.message || 'Invalid login credentials';
      this.toastr.error(message, 'Login Failed', {
        positionClass: 'toast-top-right'
      });

    }
  });
}

}
