import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {console.log('in api seerver')
}

loginUser(email: string, password: string){
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
}

fetchProducts(productId : string){
    return this.http.get(`${this.apiUrl}/product/fetchProducts?productId=${productId}`);
}

fetchAllProducts(currentPage : number, itemsPerPage : number){
    return this.http.get(`${this.apiUrl}/product/fetchAllProducts?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
}

addProduct( product : any, productId: string ){
    return this.http.post(`${this.apiUrl}/product/addProduct` ,  {product :  product , productId : productId});
}

deleteProduct( productId: number ){
    return this.http.post(`${this.apiUrl}/product/deleteProduct` ,  {productId : productId});
}


getDashboardStats(){
    return this.http.get(`${this.apiUrl}/product/getDashboardStats`);
}

getRecentOrders(){
    return this.http.get(`${this.apiUrl}/product/getRecentOrders`);
}

getPendingIssues(){
    return this.http.get(`${this.apiUrl}/product/getPendingIssues`);
}


fetchOrders(page: number = 1, limit: number = 10) {
  return this.http.get(
    `${this.apiUrl}/product/fetchOrders?page=${page}&limit=${limit}`
  );
}


  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  addCadDetails(payload: any) {
    return this.http.post(`${this.apiUrl}/cad/addCadDetails`, payload);
  }

  fetchCustomers(page: number = 1, limit: number = 10) {
      return this.http.get(
        `${this.apiUrl}/product/fetchAllUsers?page=${page}&limit=${limit}`
      );
  }

  fetchCustomerIssues(page: number = 1, limit: number = 10) {
      return this.http.get(
        `${this.apiUrl}/product/fetchCustomerIssues?page=${page}&limit=${limit}`
      );
  }



}
